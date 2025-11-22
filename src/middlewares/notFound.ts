export default (request: any, response: any, next: any) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
