import { ElementTransformer } from '@lexical/markdown';
import {
	$createBlockNode,
	BlockNode,
	generateBlockId,
	$isBlockNode,
	BlockFields,
} from './BlockNode';

/**
 * 解析block标签属性的辅助函数
 */
function parseBlockAttributes(attributesString: string): Record<string, string> {
	const attributes: Record<string, string> = {};
	const attrRegex = /(\w+)=["']([^"']*)["']/g;
	let match;

	while ((match = attrRegex.exec(attributesString)) !== null) {
		attributes[match[1]] = match[2];
	}

	return attributes;
}

/**
 * 自定义Block标签的ElementTransformer
 * 用于在markdown和lexical之间转换block标签
 */
export const BLOCK_TRANSFORMER: ElementTransformer = {
	dependencies: [BlockNode],
	export: (node, _) => {
		if (!$isBlockNode(node)) {
			return null;
		}
		return node.exportToMarkdown();
	},
	regExp: /^<block\s+([^>]+)\s*\/?>/,
	replace: (parentNode, _, match) => {
		const [, attributesString] = match;
		const attributes = parseBlockAttributes(attributesString);

		// 创建fields对象，包含所有attributes
		const fields: Record<string, string> = {
			id: attributes.id || generateBlockId(),
			blockName: attributes.name || '',
			blockType: attributes.type || 'block',
		};

		// 添加所有其他attributes
		for (const [key, value] of Object.entries(attributes)) {
			if (key !== 'name' && key !== 'type' && key !== 'id') {
				fields[key] = value;
			}
		}

		// 创建BlockNode
		const blockNode = $createBlockNode(fields as BlockFields);

		// 替换当前节点
		parentNode.replace(blockNode);
	},
	type: 'element',
};
