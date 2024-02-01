import os
import subprocess
import argparse

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('--dry-run', action='store_true', help='Enable dry run mode')
args = parser.parse_args()


registry = os.getenv('REGISTRY')
full_sha = os.getenv('full_sha')
short_sha = os.getenv('short_sha')
environment = os.getenv('ENVIRONMENT')
github_event_before = os.getenv('github_event_before')

def build_and_push(repository, dockerfile):
    docker_build=f'docker buildx build \
    -t {registry}/{repository}:{environment}-{full_sha} \
    -t {registry}/{repository}:{environment}-{short_sha} \
    --push \
    --cache-from=type=registry,ref={registry}/{repository}:latest \
    --cache-to=type=registry,ref={registry}/{repository}:latest,mode=max \
    -f {dockerfile} . '
    subprocess.run(docker_build, shell=True, text=True, check=True)

git_command = f"git diff --name-only {str(github_event_before)} {str(full_sha)} | uniq"
changed_files = subprocess.run(git_command, shell=True, text=True, capture_output=True, check=True)
changed_files_output = changed_files.stdout.strip()

images = []

if "client/" in changed_files_output:
    # Change to the server directory
    if not args.dry_run:
        os.chdir('client/')
        if environment == "staging":
            build_and_push("frontend", "Dockerfile.staging")
        else:
            build_and_push("frontend", "Dockerfile")   
        os.chdir('..')
    images.append({"name": "frontend", "index": 0})

if "server/" in changed_files_output:
    # Change to the server directory
    if not args.dry_run:
        os.chdir('server/')
        build_and_push("backend", "Dockerfile.backend")
        os.chdir('..')
    images.append({"name": "backend", "index": 1})

if "server/model/" in changed_files_output:
    # Change to the server directory
    if not args.dry_run:
        os.chdir('server/')
        build_and_push("migrations", "Dockerfile.migrations")
        os.chdir('..')
    images.append({"name": "migrations", "index": 2})

if "sharkio-docs/" in changed_files_output:
    # Change to the server directory
    if not args.dry_run:
        os.chdir('sharkio-docs/')
        build_and_push("docs", "Dockerfile")
        os.chdir('..')
    images.append({"name": "docs", "index": 3})

if  args.dry_run:
    warpped_images = '{"images_builder":' + str(images).replace("'", '"') + '}'
    print(warpped_images)
