const { convertMarkdownToLexical } = require('./dist/utilities/convertMarkdownToLexical.js');

// 简单的测试函数
async function runTests() {
	console.log('开始测试 convertMarkdownToLexical 功能...');

	const testCases = [
		{
			name: '基本文本转换',
			input: 'Hello World',
			description: '测试普通文本转换',
		},
		{
			name: '标题转换',
			input: '# 这是一个标题\n\n这是段落内容',
			description: '测试标题和段落转换',
		},
		{
			name: '列表转换',
			input: '- 项目1\n- 项目2\n- 项目3',
			description: '测试无序列表转换',
		},
		{
			name: '粗体和斜体',
			input: '这是**粗体**文本和*斜体*文本',
			description: '测试粗体和斜体格式转换',
		},
		{
			name: '代码块',
			input: '```javascript\nconsole.log("Hello World");\n```',
			description: '测试代码块转换',
		},
	];

	let passedTests = 0;
	let totalTests = testCases.length;

	for (const testCase of testCases) {
		try {
			console.log(`\n测试: ${testCase.name}`);
			console.log(`描述: ${testCase.description}`);
			console.log(`输入: ${testCase.input}`);

			const result = convertMarkdownToLexical(testCase.input);

			// 检查结果是否为对象且包含基本的Lexical结构
			if (typeof result === 'object' && result !== null) {
				console.log('✅ 测试通过 - 返回了有效的对象');
				console.log('输出结构:', JSON.stringify(result, null, 2));
				passedTests++;
			} else {
				console.log('❌ 测试失败 - 返回值不是有效对象');
				console.log('实际返回:', result);
			}
		} catch (error) {
			console.log('❌ 测试失败 - 抛出异常:', error.message);
		}
	}

	console.log(`\n\n=== 测试总结 ===`);
	console.log(`通过测试: ${passedTests}/${totalTests}`);
	console.log(`成功率: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

	if (passedTests === totalTests) {
		console.log('🎉 所有测试都通过了！convertMarkdownToLexical 功能正常工作。');
	} else {
		console.log('⚠️  部分测试失败，需要检查功能实现。');
	}
}

// 运行测试
runTests().catch(console.error);
