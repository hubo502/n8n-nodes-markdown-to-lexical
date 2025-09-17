import { createHeadlessEditor } from '@lexical/headless';
import { $convertFromMarkdownString } from '@lexical/markdown';
import { $getRoot } from 'lexical';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { MarkNode } from '@lexical/mark';
import { BlockNode } from './nodes/block/BlockNode';
import { BLOCK_TRANSFORMER } from './nodes/block/BlockTransformer';
import { TRANSFORMERS } from '@lexical/markdown';

export const EXTENDED_TRANSFORMERS = [...TRANSFORMERS, BLOCK_TRANSFORMER];

export const convertMarkdownToLexical = (inputs: string): object => {
	const editor = createHeadlessEditor({
		nodes: [
			HeadingNode,
			QuoteNode,
			ListNode,
			ListItemNode,
			CodeNode,
			CodeHighlightNode,
			LinkNode,
			MarkNode,
			BlockNode,
		],
		onError: () => {},
	});

	let result: object;

	editor.update(() => {
		$getRoot().clear();
		$convertFromMarkdownString(inputs, EXTENDED_TRANSFORMERS);
	});

	editor.read(() => {
		result = editor.getEditorState().toJSON();
	});

	return result!;
};
