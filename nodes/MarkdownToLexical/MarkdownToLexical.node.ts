import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';

import { convertMarkdownToLexical } from '../../utilities/convertMarkdownToLexical';

export class MarkdownToLexical implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Markdown to Lexical',
		name: 'markdownToLexical',
		icon: 'file:markdown.svg',
		group: ['transform'],
		version: 1,
		description: 'Converts Markdown to Lexical',
		defaults: {
			name: 'Markdown to Lexical',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Markdown',
				name: 'markdown',
				type: 'string',
				default: '',
				placeholder: 'Enter Markdown',
				description: 'Markdown to convert',
				typeOptions: {
					multiline: true,
				},
			},
		],
	};
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		let item: INodeExecutionData;
		let markdown: string;

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				markdown = this.getNodeParameter('markdown', itemIndex, '') as string;
				item = items[itemIndex];

				item.json.lexical = convertMarkdownToLexical(markdown);
			} catch (error) {
				if (this.continueOnFail()) {
					items.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex });
				} else {
					if (error.context) {
						error.context.itemIndex = itemIndex;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex,
					});
				}
			}
		}

		return [items];
	}
}
