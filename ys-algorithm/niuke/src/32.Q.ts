
/**
 * 并查集结构(模型见图片)
 */



// 数据节点
class UnionNode {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
}


/**
 * 并查集结构
 */
class UnionFind {
  fatherMap: Map<any, any>;
  sizeMap: Map<any, any>;

  constructor() {
    this.fatherMap = new Map(); //key: node, value : 父节点
    this.sizeMap = new Map();   //key: headnode 当前集合头, value: 当前集合长度
  }

  /**
   * 初始化集合
   * @param nodes 
   */
  initSets(nodes: UnionNode[]) {
    this.fatherMap.clear();
    this.sizeMap.clear();

    nodes.forEach(node => {
      this.fatherMap.set(node, node);
      this.sizeMap.set(node, 1);
    });
  }


  /**
   * 查找节点所属集合的头
   * @param node 
   */
  findHead (node: UnionNode): UnionNode {
    if (!node) return null;

    let father = this.fatherMap.get(node);
    if (father !== node) {
      father = this.findHead(father);
    }
    return father;
  }

  /**
   * 判断 2个节点是否是同一个集合
   * @param node1 
   * @param node2 
   */
  isSameSet (node1: UnionNode, node2: UnionNode): boolean {
    if (!node1 || !node2) return false;

    return this.findHead(node1) === this.findHead(node2);
  }

  /**
   * 合并 2个集合(其实就是将个数较少的一个集合的头节点 指向另一个集合的头) 
   * @param node1 
   * @param node2 
   */
  unionSet (node1: UnionNode, node2: UnionNode): UnionNode {
    if (!node1 || !node2) return null;
    
    let node1Father = this.findHead(node1);
    let node2Father = this.findHead(node2);

    if (node1Father === node2Father) return;

    let father1Size = this.sizeMap.get(node1Father);
    let father2Size = this.sizeMap.get(node2Father);

    if (father1Size <= father2Size) {
      this.fatherMap.set(node1Father, node2Father);
      this.sizeMap.set(node1Father, father1Size + father2Size);
      return node2Father;
    } else {
      this.fatherMap.set(node2Father, node2Father);
      this.sizeMap.set(node2Father, father1Size + father2Size);
      return node1Father;
    }
  }
}