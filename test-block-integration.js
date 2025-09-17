const { convertMarkdownToLexical } = require('./dist/utilities/convertMarkdownToLexical');

// 测试用例1：基本的block标签转换
const testCase1 = `# 标题

这是一段普通文本。

<block type="summary" title="摘要" content="这是一个摘要内容"/>

更多文本内容。`;

console.log('=== 测试用例1：基本block标签转换 ===');
console.log('输入:');
console.log(testCase1);
console.log('\n输出:');
try {
    const result1 = convertMarkdownToLexical(testCase1);
    console.log(JSON.stringify(result1, null, 2));
} catch (error) {
    console.error('转换失败:', error.message);
}

// 测试用例2：多个block标签
const testCase2 = `<block type="info" title="信息" content="这是信息内容"/>

## 子标题

<block type="warning" title="警告" content="这是警告内容"/>

- 列表项1
- 列表项2`;

console.log('\n\n=== 测试用例2：多个block标签 ===');
console.log('输入:');
console.log(testCase2);
console.log('\n输出:');
try {
    const result2 = convertMarkdownToLexical(testCase2);
    console.log(JSON.stringify(result2, null, 2));
} catch (error) {
    console.error('转换失败:', error.message);
}

// 测试用例3：验证block节点的结构
const testCase3 = `<block type="note" title="笔记" content="这是笔记内容"/>`;

console.log('\n\n=== 测试用例3：验证block节点结构 ===');
console.log('输入:');
console.log(testCase3);
console.log('\n输出:');
try {
    const result3 = convertMarkdownToLexical(testCase3);
    console.log(JSON.stringify(result3, null, 2));
    
    // 检查是否包含block节点
    const hasBlockNode = JSON.stringify(result3).includes('"type":"block"');
    console.log('\n包含block节点:', hasBlockNode);
    
    if (hasBlockNode) {
        console.log('✅ Block标签转换成功！');
    } else {
        console.log('❌ Block标签转换失败！');
    }
} catch (error) {
    console.error('转换失败:', error.message);
}