import MiddlewareInterface from '../interface/MiddlewareInterface';

export default interface MiddleWares {
  [t: string]: MiddlewareInterface;
}
