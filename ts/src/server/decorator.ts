import 'reflect-metadata';

export const Controller = (path: string) => {
  return (target: any) => {
    Reflect.defineMetadata('path',  path, target);
  }
}

export const createMappingDectorator = (httpMethod: string) => (path: string) => {
  return (target: any, key: any,  descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata('path', path, descriptor.value);
    Reflect.defineMetadata('httpMethod', httpMethod, descriptor.value);
  }
} 

export const Get = createMappingDectorator('get');
export const Post = createMappingDectorator('post');
export const Patch = createMappingDectorator('patch');





