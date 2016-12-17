/**
 * 通过递归回溯法求集合的幂集
 * @param  srcList   待求幂集的原集合
 * @return powerList 原集合的幂集
 */
function powerSet1FullBinaryTreeRecursion(srcList) {
  let tmpList = [], // 临时存放一个幂集元素的集合
    powerList = [], // 幂集
    srcLen = srcList.length; // 原集合的长度

  /**
   * 进入函数时，已经对前i-1个元素做了取舍处理，取得了前i-1个元素的幂集
   * 现在从第i个元素进行取舍处理，取得前i个元素的幂集
   * 直到到达叶子节点，即i===n时，求得原集合的幂集
   * @param i  原集合中元素的位置
   */
  (function recurse(i) {

    if (i === srcLen) { // 当达到树的最后一层
      powerList.push([...tmpList]); // 将此集合添加到最终的幂集集合中
    } else {
      let x = srcList[i]; // 取出srcList的第i个元素
      tmpList.push(x);    // tmpList添加第i个元素
      recurse(i + 1);     // 左加，然后进行下一层的递归
      tmpList.pop();      // tmpList除去第i个元素
      recurse(i + 1);     // 右减，然后进行下一层的递归
    }
  })(0); // 从第一个元素开始递归调用

  return powerList;
}

/**
 * 通过递归回溯法求集合的幂集
 * @param  srcList   待求幂集的原集合
 * @return powerList 原集合的幂集
 */
function powerSet2FullBinaryTreeQueue(srcList) {
  let tmpList = [], // 临时存放一个幂集元素的集合
    powerList = [], // 幂集
    srcLen = srcList.length; // 原集合的长度

  /**
   * 进入函数时，已经对前i-1个元素做了取舍处理，取得了前i-1个元素的幂集
   * 现在从第i个元素进行取舍处理，取得前i个元素的幂集
   * 直到到达叶子节点，即i===n时，求得原集合的幂集
   * @param i  原集合中元素的位置
   */
  (function recurse(i) {

    if (i === srcLen) { // 当达到树的最后一层
      powerList.push([...tmpList]); // 将此集合添加到最终的幂集集合中
    } else {
      let x = srcList[i]; // 取出srcList的第i个元素
      tmpList.push(x);    // tmpList添加第i个元素
      recurse(i + 1);     // 左加，然后进行下一层的递归
      tmpList.pop();      // tmpList除去第i个元素
      recurse(i + 1);     // 右减，然后进行下一层的递归
    }
  })(0); // 从第一个元素开始递归调用

  return powerList;
}

/**
 * 通过状态树的层次遍历求集合的幂集
 * @param  srcList   待求幂集的原集合
 * @return powerList 原集合的幂集
 */
function powerSet3PruneBinaryTreeFor(srcList) {
  let srcLen = srcList.length, // 原集合的长度
    powerList = [[]];          // 幂集

  for (let i=0; i < srcLen; i++) { // 遍历原集合
    for (let j = 0, len = powerList.length; j < len; j++) { // 遍历已经求得的前i-1个元素的幂集，生成前i个元素的幂集
      powerList.push(powerList[j].concat(srcList[i])); // 依次将在现有幂集元素集上添加第i个元素的集合添加到队尾
    }
  }

  return powerList;
}

/**
 * 通过Array.prototype.reduce遍历求集合的幂集
 * @param  srcList   待求幂集的原集合
 * @return powerList 原集合的幂集
 */
function powerSet3PruneBinaryTreeReduce(srcList) {
  let reducer = Array.prototype.reduce;

  /**
   * Array.prototype.reduce是类数组的新型遍历方式，其回调函数的参数如下
   * @param  powerList 上一次遍历回调函数的返回值，第一次遍历时其值可在回调函数后的参数指定
   * @param  item      当前遍历的值
   * @param  index     当前遍历的索引
   * @return powerList 幂集
   */
  return reducer.call(srcList, function(powerList, item, index) { // 遍历原集合
    let next = [ item ];
    return powerList.reduce(function(powerList, item) { // 遍历已经求得的前i-1个元素的幂集，生成前i个元素的幂集
      powerList.push(item.concat(next)) // 依次在现有幂集元素集上添加第i个元素，添加到队尾
      return powerList
    }, powerList)
  }, [[]]) // powerList的初始值为包含空集的集合[[]]
}

/**
 * 通过递归来实现算法3的求集合的幂集
 * @param  srcList   待求幂集的原集合
 * @return powerList 原集合的幂集
 */
function powerSet3PruneBinaryTreeRecursion(srcList) {
  let powerList = [];

  (function recurse(srcList) {

    if (srcList.length < 1) { // 如果原集合已经空了
      powerList.push([]); // 添加空集
    } else {

      let lastElement, object,
        preList = srcList.slice(); // 复制原集合
      lastElement = preList.pop();

      recurse(preList);

      for (let i = 0, len = powerList.length; i < len; i++) {
        let item = powerList[i].slice(0);
        item.push(lastElement);
        powerList.push(item);
      }
    }

  })(srcList);

  return powerList;
}

/**
 * 通过二进制状态位求集合的幂集
 * @param  srcList   待求幂集的原集合
 * @return powerList 原集合的幂集
 */
function powerSet4Binary(srcList) {
  let powerLen = Math.pow(2, srcList.length), // 幂集的个数
    powerList = []; // 幂集

  for (let i = 0; i < powerLen; i++) { // 依次遍历每一个状态对应的幂集
    let tmpList = [];
    for (let j = 0, bi = i; bi; bi >>>= 1, j++) { // 遍历幂集的第i个状态的每一位，bi代表i的二进制形式
      if (bi & 1) { // 如果bi的最低位是１
        tmpList.push(srcList[j]); //将其对应的原集合的元素添加到临时元素集中
      }
    }

    powerList.push(tmpList); // 将一个幂集的元素集添加到幂集
  }
  return powerList;
}

/**
 * 通过二进制状态位的字符串形式求集合的幂集
 * @param  srcList   待求幂集的原集合
 * @return powerList 原集合的幂集
 */
function powerSet4BinaryString(srcList) {
  let powerLen = Math.pow(2, srcList.length), // 幂集的个数
    powerList = []; // 幂集

  for (let i = 0; i < powerLen; i++) { // 依次遍历每一个状态对应的幂集
    let tmpList = [],
      bi = i.toString(2).split(''); // 第i个元素的二进制状态的字符串表示
    for (let j = 0; bi.length !== 0; j++) { // 遍历幂集的第i个状态的每一位
      if (bi.pop() === "1") { // 如果bi的最低位是１
        tmpList.push(srcList[j]); //将其对应的原集合的元素添加到临时元素集中
      }
    }
    powerList.push(tmpList); // 将一个幂集的元素集添加到幂集
  }
  return powerList;
}

/**
 * 通过递归和循环实现的多叉树的深度优先遍历求集合的幂集
 * @param  srcList   待求幂集的原集合
 * @return powerList 原集合的幂集
 */
function powerSet5TreeRecursion(srcList) {
  let tmpList = [], // 临时存放一个幂集元素的集合
    powerList = [[]], // 幂集,算法开始之前加入空集
    srcLen = srcList.length; // 原集合的长度

  /**
   * 通过递归和循环的方式来实现多叉树的深度优先遍历求集合的幂集
   * 递归，进行树的深度拓展，结束条件为递归到树的最后一层，树的高度为原集合的元素个数+1
   * 循环，进行树的广度拓展，循环的次数为树的分支个数，结束条件为所有分之都完成了递归调用
   * “二叉状态树”，不需要用到循环，只需要写两次递归调用即可；
   * “多叉状态树”，由于不确定分支的个数，才使用循环来进行递归调用
   * @param i  原集合中元素的位置
   */
  (function recurse(i) {
    for (; i < srcLen; i++) {   // 遍历所有的分支子树
      tmpList.push(srcList[i]); // 将原集合第i个元素添加进幂集的临时元素集
      powerList.push(tmpList.slice()); // 将新生程的元素集，添加到幂集
      recurse(i + 1); // 继续遍历状态树的下一层
      tmpList.pop();  // 移出添加的第i个元素，恢复临时元素集到父节点的状态，使得一个父节点下的每一次循环都可以有相同的初始条件
    }
  })(0); // 从第一个元素开始递归调用

  return powerList;
}

/**
 * 基于队列的多叉树的广度优先遍历求集合的幂集
 * @param  srcList   待求幂集的原集合
 * @return powerList 原集合的幂集
 */
function powerSet6TreeQueue(srcList) {
  let tmpList = [], // 临时存放部分幂集的集合
    powerList = [], // 幂集
    srcLen = srcList.length, // 原集合的长度
    start = 0; // 当前层在powerList的开始位置

  for (let i = 0; i < srcLen; i++) { // 先将单元素入队
    powerList.push({
      data: [srcList[i]],
      index: i + 1
    }); // index代表这个节点的最后一个元素之后的第一个节点的位置
  }

  for (let i = 1; i < srcLen; i++) { // 整棵树的高度
    let s = start;
    start = powerList.length; // 下一层的开始位置从length位置开始
    for (let node = [], len = powerList.length; s < len; s++) { // 在已确定的幂集列表中，从上一层的元素的位置开始知道列表末尾结束
      node = powerList[s]; // 从队列中取出上一层的节点
      for (let j = node.index; j < srcLen; j++) { // 遍历这个节点的最后一个元素之后所有节点
        let tmpNode = node.data.slice();
        tmpNode.push(srcList[j]); // 在该节点的基础上，依次添加每一个元素
        powerList.push({
          data: tmpNode,
          index: j + 1
        }); // 添加新的下一层的元素，然后入队
      }
    }
  }

  for (let x = 0, len = powerList.length; x < len; x++) {
    powerList[x] = powerList[x].data; // 剔除掉对于属性，只保留数据
  }

  powerList.push([]); // 最后添加空集

  return powerList;
}


let shortList = [1, 2, 3],
  longList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

console.time('powerSet1FullBinaryTreeRecursion---short');
powerSet1FullBinaryTreeRecursion(shortList);
console.timeEnd('powerSet1FullBinaryTreeRecursion---short');

console.time('powerSet2FullBinaryTreeQueue---short');
powerSet2FullBinaryTreeQueue(shortList);
console.timeEnd('powerSet2FullBinaryTreeQueue---short');

console.time('powerSet3PruneBinaryTreeFor---short');
powerSet3PruneBinaryTreeFor(shortList);
console.timeEnd('powerSet3PruneBinaryTreeFor---short');

console.time('powerSet3PruneBinaryTreeReduce---short');
powerSet3PruneBinaryTreeReduce(shortList);
console.timeEnd('powerSet3PruneBinaryTreeReduce---short');

console.time('powerSet3PruneBinaryTreeRecursion---short');
powerSet3PruneBinaryTreeRecursion(shortList);
console.timeEnd('powerSet3PruneBinaryTreeRecursion---short');

console.time('powerSet4Binary---short');
powerSet4Binary(shortList);
console.timeEnd('powerSet4Binary---short');

console.time('powerSet4BinaryString---short');
powerSet4BinaryString(shortList);
console.timeEnd('powerSet4BinaryString---short');

console.time('powerSet5TreeRecursion---short');
powerSet5TreeRecursion(shortList);
console.timeEnd('powerSet5TreeRecursion---short');

console.time('powerSet6TreeQueue---short');
powerSet6TreeQueue(shortList);
console.timeEnd('powerSet6TreeQueue---short');

console.log('------------------------------------')

console.time('powerSet1FullBinaryTreeRecursion---long');
powerSet1FullBinaryTreeRecursion(longList);
console.timeEnd('powerSet1FullBinaryTreeRecursion---long');

console.time('powerSet2FullBinaryTreeQueue---long');
powerSet2FullBinaryTreeQueue(longList);
console.timeEnd('powerSet2FullBinaryTreeQueue---long');

console.time('powerSet3PruneBinaryTreeFor---long');
powerSet3PruneBinaryTreeFor(longList);
console.timeEnd('powerSet3PruneBinaryTreeFor---long');

console.time('powerSet3PruneBinaryTreeReduce---long');
powerSet3PruneBinaryTreeReduce(longList);
console.timeEnd('powerSet3PruneBinaryTreeReduce---long');

console.time('powerSet3PruneBinaryTreeRecursion---long');
powerSet3PruneBinaryTreeRecursion(longList);
console.timeEnd('powerSet3PruneBinaryTreeRecursion---long');

console.time('powerSet4Binary---long');
powerSet4Binary(longList);
console.timeEnd('powerSet4Binary---long');

console.time('powerSet4BinaryString---long');
powerSet4BinaryString(longList);
console.timeEnd('powerSet4BinaryString---long');

console.time('powerSet5TreeRecursion---long');
powerSet5TreeRecursion(longList);
console.timeEnd('powerSet5TreeRecursion---long');

console.time('powerSet6TreeQueue---long');
powerSet6TreeQueue(longList);
console.timeEnd('powerSet6TreeQueue---long');
