const { convertMarkdownWithBlocksToLexical, convertBlockTagsOnly } = require('./dist/utilities/convertMarkdownBlockToLexical.js');

// 测试用例1: 用户提供的示例
const testMarkdown1 = '<block type="summary" title="test" content="test"/>';

console.log('=== 测试用例1: 基本block标签转换 ===');
console.log('输入:', testMarkdown1);
const result1 = convertBlockTagsOnly(testMarkdown1);
console.log('输出:', JSON.stringify(result1, null, 2));

// 测试用例2: 包含markdown内容和block标签
const testMarkdown2 = `# 标题

这是一段普通的markdown文本。

<block type="summary" title="自由≠好用" content="没有边界的自由，是混乱的温床。"/>

## 子标题

更多内容...`;

console.log('\n=== 测试用例2: 混合markdown和block标签 ===');
console.log('输入:', testMarkdown2);
const result2 = convertMarkdownWithBlocksToLexical(testMarkdown2);
console.log('输出:', JSON.stringify(result2, null, 2));

// 测试用例3: 多个block标签
const testMarkdown3 = `<block type="summary" title="第一个" content="第一个摘要"/>

<block type="note" title="第二个" content="第二个笔记"/>`;

console.log('\n=== 测试用例3: 多个block标签 ===');
console.log('输入:', testMarkdown3);
const result3 = convertMarkdownWithBlocksToLexical(testMarkdown3);
console.log('输出:', JSON.stringify(result3, null, 2));

// 验证生成的JSON格式是否符合用户期望
console.log('\n=== 验证JSON格式 ===');
const firstBlock = result1.root.children[0];
console.log('第一个block的结构:');
console.log('- type:', firstBlock.type);
console.log('- fields.id:', firstBlock.fields.id);
console.log('- fields.title:', firstBlock.fields.title);
console.log('- fields.summary:', firstBlock.fields.summary);
console.log('- fields.blockType:', firstBlock.fields.blockType);
console.log('- version:', firstBlock.version);

console.log('\n转换完成！');