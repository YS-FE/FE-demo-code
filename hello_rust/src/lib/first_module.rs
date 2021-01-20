const NUM: u32 = 28;

pub fn  f1 () -> String {
  println!("num = {}", NUM);
  return String::from("helloworld");
}

pub mod inner {
  pub fn f2 () -> bool {
    println!("{}", super::NUM);
    return false;
  }
}