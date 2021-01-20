mod lib;

// use crate::lib::first_module;
use lib::first_module;
use lib::second_module;


fn main() {
  // const PI:f32 = 3.14;
  // println!("PI is {}", PI);

  // let a = 32_000;
  // let b = 0xff;
  // let c = 22.0 / 3.0;
  // println!("a = {}, b = {}, c = {}", a, b, c);


  // let d: [u32;5] = [1,2,3,4,5];
  // println!("d[0] = {}", d[0]);

  // let t = test_one(20);
  // println!("t = {}", t);

  // test_two(true);
  // test_three();

  println!("module f1 = {}", lib::first_module::f1());
  println!("module inner f2 = {}", lib::first_module::inner::f2());
  println!("second_module  f1 = {}", lib::second_module::f1());

  println!("module f1 = {}", first_module::f1());
  println!("module inner f2 = {}", first_module::inner::f2());
  println!("second_module  f1 = {}", second_module::f1());
}


fn  test_one (x: u32) -> u32 {
  let a = x * 20;
  return a;
}


fn test_two (condition: bool) {
  let number = if condition { let y = 10; y + 1 } else { 6 };
  println!("number = {}", number);
}

fn test_three () {
  #[derive(Debug)]
  struct Color {
    blue: String,
    gray: String
  }

  let color = Color{
    blue: String::from("blue"),
    gray: String::from("gray")
  };

  println!("blue = {}, gray = {}", color.blue, color.gray);
  println!("color = {:#?}", color);

}

