import React from 'react';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RequestsMetadataContext } from '../../context/requests-context';
import { RequestPage } from '../../components/request-page/request';

export const ServiceRequest = () => {
  const { id, serviceId } = useParams();
  const {
    loadData,
    requestsData: requests,
    servicesData: services,
  } = useContext(RequestsMetadataContext);

  useEffect(() => {
    loadData?.();
  }, []);

  const service = services?.find((service) => service.id === serviceId);
  const request: any = requests?.find((request) => {
    return request.id === id;
  });

  return service && request ? (
    <RequestPage service={service} request={request}></RequestPage>
  ) : (
    'not found'
  );
};
