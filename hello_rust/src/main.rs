fn main() {
  // test_one();
  test_two();
}

fn test_one () {
  enum Book {
    Papery { index: u32, page: u32 },
    Electronic { url: String },
    Net(u8, u32)
  }

  let book = Book::Papery { index: 1001, page: 2020 };
  let ebook = Book::Electronic {
    url: String::from("url..."),
  };

  let t = Book::Net(32, 3200);

  match t {
    Book::Papery { index, page } => {
      println!("Papery book {}, {}", index, page);
    }
    Book::Electronic { url } => {
      println!("E-book {}", url);
    },
    Book::Net(a, b) => {
      println!("a = {}, b = {}", a, b);
    }
  }
}

fn  test_two () {
  // let opt = Option::Some("hello");
  let opt: Option<&str> = Option::None;

  match opt {
    Option::Some(str) => {
      println!("str = {}", str);
    },
    Option::None => {
      println!("none");
    }
  }
}
