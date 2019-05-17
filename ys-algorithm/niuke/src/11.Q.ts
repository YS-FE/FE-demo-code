import Queue from './08-02.Q';

/**
 * 按照给定的类完成猫狗队列
 * 猫狗分别入队，可以取各自队列中队头的，也可以取两个队列中的队头
 * 
 */
class Pet {
  private type: string;
  private name: string;
  constructor(type: string, name: string){
    this.type = type;
    this.name = name;
  }

  getType(): string{
    return this.type;
  }

  getName(): string{
    return this.name;
  }
}

class Dog extends Pet {
  constructor(name: string){
    super('Dog', name);
  }
  bark(){
    console.log("wang wang ...");
  }
}

class Cat extends Pet {
  constructor(name: string){
    super('Cat', name);
  }
  miao(){
    console.log('miao miao ...');
  }
}


class PetEnterQueue {
  public pet: Pet;
  public count: number;

  constructor(pet: Pet, count: number){
    this.pet = pet;
    this.count = count;
  }
}


class DogAndCat {
  private dogQueue: Queue<PetEnterQueue>;
  private catQueue: Queue<PetEnterQueue>;
  private count: number;

  constructor(){
    this.dogQueue = new Queue<PetEnterQueue>(Array(40));
    this.catQueue = new Queue<PetEnterQueue>(Array(40));
    this.count = 0;
  }

  entry(pet: Pet){
    if (pet.getType() === 'Dog'){
      this.dogQueue.enqueue(new PetEnterQueue(pet, ++this.count));
    } else {
      this.catQueue.enqueue(new PetEnterQueue(pet, ++this.count));
    }
  }

  outDog(): PetEnterQueue {
    if (this.dogQueue.isEmpty()) throw new Error("狗队列为空");
    this.count--;
    return this.dogQueue.dequeue();
  }

  outCat(): PetEnterQueue {
    if (this.catQueue.isEmpty())  throw new Error("猫队列为空");
    this.count--;
    return this.catQueue.dequeue();
  }

  outPet(): PetEnterQueue {
    if (this.isEmpty())  throw new Error("猫狗队列都为空");

    if (this.dogQueue.isEmpty()) {
      this.count--;
      return this.catQueue.dequeue();
    } else if (this.catQueue.isEmpty()){
      this.count--;
      return this.dogQueue.dequeue();
    } else {
      let cat = this.catQueue.dequeue();
      let dog = this.dogQueue.dequeue();

      if (cat.count < dog.count) {
        this.dogQueue.enqueue(dog);
        return cat;
      } else {
        this.catQueue.enqueue(cat);
        return dog;
      }
    }
  }

  isEmpty(): boolean {
    return this.dogQueue.isEmpty() && this.catQueue.isEmpty();
  }

}


export default {};

let dog1 = new Dog('dog1');
let dog2 = new Dog('dog2');
let dog3 = new Dog('dog3');
let dog4 = new Dog('dog4');


let cat1 = new Cat('cat1');
let cat2 = new Cat('cat2');
let cat3 = new Cat('cat3');

let  dogAndCat = new DogAndCat();

dogAndCat.entry(dog1); //1
dogAndCat.entry(cat1); //2
dogAndCat.entry(dog2); //3
dogAndCat.entry(dog3); //4
dogAndCat.entry(cat2); //5
dogAndCat.entry(dog4); //6
dogAndCat.entry(cat3); //7


console.log(dogAndCat.outDog().count);
console.log(dogAndCat.outCat().count);
console.log(dogAndCat.outPet().pet.getType());






