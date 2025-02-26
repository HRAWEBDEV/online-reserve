export class OutOfContext extends Error {
 constructor() {
  super('context not found');
 }
}
