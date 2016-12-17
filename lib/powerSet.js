/**
 * 通过递归和循环实现的多叉树的深度优先遍历求集合的幂集
 * @param  srcList   待求幂集的原集合
 * @return powerList 原集合的幂集
 */
module.exports = function(srcList) {
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
