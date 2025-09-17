import {
	DecoratorNode,
	NodeKey,
	LexicalNode,
	EditorConfig,
	SerializedLexicalNode,
	Spread,
} from 'lexical';

export interface BlockFields {
	id: string;
	blockName: string;
	blockType: string;
	[key: string]: string;
}

export type SerializedBlockNode = Spread<
	{
		fields: BlockFields;
		format: string;
		version: number;
	},
	SerializedLexicalNode
>;

/**
 * 自定义Block节点类，用于表示markdown中的block标签
 */
export class BlockNode extends DecoratorNode<null> {
	__fields: BlockFields;
	__format: string;
	__version: number;

	static getType(): string {
		return 'block';
	}

	static clone(node: BlockNode): BlockNode {
		return new BlockNode(node.__fields, node.__format, node.__version, node.__key);
	}

	constructor(fields: BlockFields, format: string = '', version: number = 2, key?: NodeKey) {
		super(key);
		this.__fields = fields;
		this.__format = format;
		this.__version = version;
	}

	createDOM(config: EditorConfig): any {
		// 在headless环境中，createDOM方法不会被调用
		return null;
	}

	updateDOM(): false {
		return false;
	}

	decorate(): null {
		// 在headless环境中，decorate方法不会被调用，返回null即可
		return null;
	}

	getFields(): BlockFields {
		return this.__fields;
	}

	setFields(fields: BlockFields): void {
		const writable = this.getWritable();
		writable.__fields = fields;
	}

	getFormat(): string {
		return this.__format;
	}

	getVersion(): number {
		return this.__version;
	}

	static importJSON(serializedNode: SerializedBlockNode): BlockNode {
		const { fields, format, version } = serializedNode;
		return $createBlockNode(fields, format, version);
	}

	exportJSON(): SerializedBlockNode {
		return {
			fields: this.__fields,
			format: this.__format,
			version: this.__version,
			type: 'block',
		};
	}

	// 用于markdown导出
	exportToMarkdown(): string {
		const fields = this.__fields;
		const attributes: string[] = [];
		
		// 遍历所有字段并输出
		for (const [key, value] of Object.entries(fields)) {
			if (value) { // 只输出非空值
				// 特殊字段映射：blockName -> name, blockType -> type
				const attrName = key === 'blockName' ? 'name' : key === 'blockType' ? 'type' : key;
				attributes.push(`${attrName}="${value}"`);
			}
		}
		
		return `<block ${attributes.join(' ')}/>`;
	}

	// 获取文本内容
	getTextContent(): string {
		return `${this.__fields.title}: ${this.__fields.summary}`;
	}

	// 检查是否为内联元素
	isInline(): false {
		return false;
	}

	// 检查是否为键盘可选择
	isKeyboardSelectable(): true {
		return true;
	}
}

/**
 * 创建BlockNode的工厂函数
 */
export function $createBlockNode(
	fields: BlockFields,
	format: string = '',
	version: number = 2,
): BlockNode {
	return new BlockNode(fields, format, version);
}

/**
 * 检查节点是否为BlockNode的类型守卫函数
 */
export function $isBlockNode(node: LexicalNode | null | undefined): node is BlockNode {
	return node instanceof BlockNode;
}

/**
 * 生成随机ID的辅助函数
 */
export function generateBlockId(): string {
	return Array.from(crypto.getRandomValues(new Uint8Array(12)))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
}
