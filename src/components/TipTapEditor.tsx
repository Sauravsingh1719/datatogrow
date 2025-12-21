'use client';
import {
  useEditor,
  EditorContent,
  Editor,
  useEditorState,
  mergeAttributes
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Link from "@tiptap/extension-link";
import { Extension } from "@tiptap/core";
import { uploadImage } from "@/app/actions";

import { Toggle } from "@/components/ui/toggle";
import {
  BoldIcon,
  CodeIcon,
  HighlighterIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  Quote,
  RedoIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
  UnlinkIcon,
  TypeIcon,
  PaletteIcon,
  ImageIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  ClipboardIcon,
  AnchorIcon,
  Trash2Icon,
  PlusIcon,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  CheckSquareIcon,
  MinusIcon,
  CheckIcon,
  MoveLeftIcon,
  MoveRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ReactNode, useState, useRef, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BubbleMenu as TiptapBubbleMenu } from "@tiptap/react/menus";
import { FloatingMenu as TiptapFloatingMenu } from "@tiptap/react/menus";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ResizableImage = Image.extend({
  name: 'image',
  
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: null,
        parseHTML: element => element.getAttribute('width') || element.style.width || null,
        renderHTML: attributes => {
          if (!attributes.width) {
            return {}
          }
          return {
            width: attributes.width,
            style: `width: ${attributes.width};`,
          }
        },
      },
      height: {
        default: null,
        parseHTML: element => element.getAttribute('height') || element.style.height || null,
        renderHTML: attributes => {
          if (!attributes.height) {
            return {}
          }
          return {
            height: attributes.height,
            style: `height: ${attributes.height};`,
          }
        },
      },
      align: {
        default: 'left',
        parseHTML: element => {
          const align = element.getAttribute('data-align') || element.style.float || element.style.textAlign || 'left';
          return align === 'none' ? 'left' : align;
        },
        renderHTML: attributes => {
          const align = attributes.align || 'left';
          let style = '';
          
          if (align === 'left') {
            style = 'float: left; margin: 0 1rem 1rem 0; max-width: 100%;';
          } else if (align === 'right') {
            style = 'float: right; margin: 0 0 1rem 1rem; max-width: 100%;';
          } else if (align === 'center') {
            style = 'display: block; margin: 1rem auto; max-width: 100%;';
          } else {
            style = 'max-width: 100%;';
          }
          
          return {
            'data-align': align,
            style: style,
          };
        },
      },
    }
  },
  
  addCommands() {
    return {
      setImage: (options) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        })
      },
      setImageAlign: (align) => ({ chain }) => {
        return chain()
          .updateAttributes('image', { align })
          .run()
      },
    }
  },
})

const FontSizeExtension = Extension.create({
  name: 'fontSize',
  
  addOptions() {
    return {
      types: ['textStyle'],
    }
  },
  
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {}
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              }
            },
          },
        },
      },
    ]
  },
  
  addCommands() {
    return {
      setFontSize: (fontSize) => ({ commands }) => {
        return commands.setMark('textStyle', { fontSize });
      },
      unsetFontSize: () => ({ commands }) => {
        return commands.setMark('textStyle', { fontSize: null });
      },
    };
  },
});

interface EnhancedTiptapEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
}

const colorPalette = [
  "#000000", "#333333", "#666666", "#999999", "#CCCCCC", "#FFFFFF",
  "#FF0000", "#FF6B6B", "#FFA500", "#FFD700", "#FFFF00", "#9ACD32",
  "#00FF00", "#32CD32", "#00FFFF", "#1E90FF", "#0000FF", "#8A2BE2",
  "#FF00FF", "#FF1493", "#A52A2A", "#D2691E", "#228B22", "#008B8B",
  "#4682B4", "#483D8B", "#9400D3", "#C71585"
];

const highlightColors = [
  "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#F44336",
  "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3",
  "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A",
  "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722"
];

const fontSizes = [
  "12px", "14px", "16px", "18px", "20px", "24px",
  "28px", "32px", "36px", "40px", "48px", "56px"
];

const EnhancedTiptapEditor = ({
  content,
  onChange,
  placeholder = "Start writing here...",
}: EnhancedTiptapEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
          HTMLAttributes: {
            class: 'font-bold',
          }
        },
      }).extend({
        addOptions() {
            return {
                ...this.parent?.(),
                levels: [1, 2, 3, 4, 5, 6],
            }
        },
        addAttributes() {
            return {
                level: {
                    default: 1,
                    rendered: false, 
                },
            }
        },
        renderHTML({ node, HTMLAttributes }) {
            const hasLevel = this.options.levels.includes(node.attrs.level)
            const level = hasLevel ? node.attrs.level : this.options.levels[0]
            
            const classes: Record<number, string> = {
                1: 'text-4xl font-extrabold mb-4 mt-6',
                2: 'text-3xl font-bold mb-3 mt-5',
                3: 'text-2xl font-bold mb-3 mt-4',
                4: 'text-xl font-bold mb-2 mt-3',
                5: 'text-lg font-bold mb-2 mt-2',
                6: 'text-base font-bold mb-2 mt-2',
            }

            return [
                `h${level}`,
                mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                    class: classes[level],
                }),
                0,
            ]
        },
      }),
      TextStyle,
      FontSizeExtension,
      Color,
      Highlight.configure({ multicolor: true }),
      ResizableImage.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
        defaultAlignment: 'left',
      }),
      Placeholder.configure({
        placeholder,
      }),
      Typography,
      HorizontalRule,
      Dropcursor,
      Gapcursor,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline',
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none max-w-none min-h-[400px] p-4",
      },
    },
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    immediatelyRender: false,
  });

 const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;


    setIsUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const result: any = await uploadImage(formData);

      if (result?.secure_url) {
        
        editor.chain().focus().setImage({ 
            src: result.secure_url,
            width: '100%', 
            height: 'auto',
            align: 'center'
        }).run();
        
      } else {
        throw new Error("Failed to get image URL");
      }

    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="bg-background relative rounded-lg border shadow-sm">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={isUploading} 
      />
      
      {editor && (
        <>
          <EnhancedToolBar editor={editor} fileInputRef={fileInputRef} />
          <EnhancedBubbleMenu editor={editor} />
          <EnhancedFloatingMenu editor={editor} />
        </>
      )}
      <EditorContent editor={editor} className="min-h-[400px]" />
    </div>
  );
};

export default EnhancedTiptapEditor;

const ImageResizeControls = ({ editor }: { editor: Editor }) => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [imagePos, setImagePos] = useState<number | null>(null);
  const [align, setAlign] = useState('left');
  
  useEffect(() => {
    const updateSelection = () => {
      const { from, to } = editor.state.selection;
      let selectedImagePos = null;
      let selectedImageNode = null;
      
      editor.state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type.name === 'image') {
          selectedImagePos = pos;
          selectedImageNode = node;
          return false;
        }
        return true;
      });
      
      if (selectedImageNode) {
        setImagePos(selectedImagePos);
        setWidth(selectedImageNode.attrs.width || '');
        setHeight(selectedImageNode.attrs.height || '');
        setAlign(selectedImageNode.attrs.align || 'left');
      } else {
        setImagePos(null);
        setWidth('');
        setHeight('');
        setAlign('left');
      }
    };
    
    updateSelection();
    
    editor.on('selectionUpdate', updateSelection);
    
    return () => {
      editor.off('selectionUpdate', updateSelection);
    };
  }, [editor]);
  
  if (imagePos === null) return null;
  
  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (imagePos === null) return;
    
    editor.chain().setNodeSelection(imagePos).focus().run();
    
    const node = editor.state.doc.nodeAt(imagePos);
    if (!node) return;
    
    const currentAttrs = node.attrs;
    
    const newAttrs: any = { ...currentAttrs };
    
    if (width.trim()) {
      let widthValue = width.trim();
      if (!widthValue.includes('px') && !widthValue.includes('%')) {
        widthValue = `${widthValue}px`;
      }
      newAttrs.width = widthValue;
    } else {
      newAttrs.width = null;
    }
    
    if (height.trim()) {
      let heightValue = height.trim();
      if (heightValue !== 'auto' && !heightValue.includes('px') && !heightValue.includes('%')) {
        heightValue = `${heightValue}px`;
      }
      newAttrs.height = heightValue;
    } else {
      newAttrs.height = null;
    }
    
    editor.chain()
      .setNodeSelection(imagePos)
      .updateAttributes('image', newAttrs)
      .run();
  };
  
  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (imagePos === null) return;
    
    editor.chain()
      .setNodeSelection(imagePos)
      .updateAttributes('image', {
        width: null,
        height: null,
        align: 'left'
      })
      .run();
    
    setWidth('');
    setHeight('');
    setAlign('left');
  };
  
  const handleAlign = (alignment: string) => {
    if (imagePos === null) return;
    
    editor.chain()
      .setNodeSelection(imagePos)
      .setImageAlign(alignment)
      .run();
    
    setAlign(alignment);
  };
  
  return (
    <div className="flex items-center gap-2 p-2 border-t bg-gray-50">
      <span className="text-sm font-medium whitespace-nowrap">Image Options:</span>
      
      <div className="flex items-center gap-2">
        {}
        <div className="flex items-center gap-1">
          <span className="text-sm">Align:</span>
          <div className="flex">
            <Button 
              type="button"
              size="sm" 
              variant={align === 'left' ? "default" : "outline"}
              onClick={() => handleAlign('left')}
              className="h-8 px-2 rounded-r-none border-r-0"
              title="Align left with text wrapping"
            >
              <MoveLeftIcon className="h-4 w-4" />
            </Button>
            <Button 
              type="button"
              size="sm" 
              variant={align === 'center' ? "default" : "outline"}
              onClick={() => handleAlign('center')}
              className="h-8 px-2 rounded-none border-x-0"
              title="Center (no text wrapping)"
            >
              <AlignCenterIcon className="h-4 w-4" />
            </Button>
            <Button 
              type="button"
              size="sm" 
              variant={align === 'right' ? "default" : "outline"}
              onClick={() => handleAlign('right')}
              className="h-8 px-2 rounded-l-none border-l-0"
              title="Align right with text wrapping"
            >
              <MoveRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Separator orientation="vertical" className="h-6" />
        
        {}
        <div className="flex items-center gap-1">
          <span className="text-sm">Size:</span>
          <div className="flex items-center gap-1">
            <Input
              type="text"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="Width"
              className="w-16 h-8 text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleApply(e as any);
                }
              }}
            />
            <span className="text-sm mx-1">×</span>
            <Input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Height"
              className="w-16 h-8 text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleApply(e as any);
                }
              }}
            />
          </div>
        </div>
        
        <Button 
          type="button"
          size="sm" 
          variant="default"
          onClick={handleApply}
          className="h-8 px-3"
        >
          Apply
        </Button>
        
        <Button 
          type="button"
          size="sm" 
          variant="outline"
          onClick={handleReset}
          className="h-8 px-3"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

const EnhancedToolBar = ({ editor, fileInputRef }: { editor: Editor; fileInputRef: React.RefObject<HTMLInputElement> }) => {
  const [isImageSelected, setIsImageSelected] = useState(false);
  
  useEffect(() => {
    const updateSelection = () => {
      const { from, to } = editor.state.selection;
      let foundImage = false;
      
      editor.state.doc.nodesBetween(from, to, (node) => {
        if (node.type.name === 'image') {
          foundImage = true;
          return false;
        }
        return true;
      });
      
      setIsImageSelected(foundImage);
    };
    
    updateSelection();
    
    editor.on('selectionUpdate', updateSelection);
    
    return () => {
      editor.off('selectionUpdate', updateSelection);
    };
  }, [editor]);
  
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        isHighlight: ctx.editor.isActive("highlight") ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        isLink: ctx.editor.isActive("link") ?? false,
        canRedo: editor.can().redo(),
        canUndo: editor.can().undo(),
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isTaskList: ctx.editor.isActive("taskList") ?? false,
        textAlign: ctx.editor.isActive({ textAlign: 'left' }) ? 'left' :
                  ctx.editor.isActive({ textAlign: 'center' }) ? 'center' :
                  ctx.editor.isActive({ textAlign: 'right' }) ? 'right' :
                  ctx.editor.isActive({ textAlign: 'justify' }) ? 'justify' : 'left',
      };
    },
  });

  const handleHeadingChange = (value: string) => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = Number.parseInt(value.replace("heading", "")) as 1 | 2 | 3 | 4 | 5 | 6;
      editor.chain().focus().setHeading({ level }).run();
    }
  };

  const copyToClipboard = async () => {
    const html = editor.getHTML();
    await navigator.clipboard.writeText(html);
  };
  
  const resetFormatting = () => {
    editor.chain().focus().clearNodes().unsetAllMarks().run();
  };

  return (
    <div className="bg-background sticky top-0 z-10 border-b">
      {}
      <div className="flex flex-wrap items-center gap-1 p-2">
        <Select
          onValueChange={handleHeadingChange}
          value={
            editorState.isHeading1 ? "heading1"
              : editorState.isHeading2 ? "heading2"
              : editorState.isHeading3 ? "heading3"
              : editorState.isHeading4 ? "heading4"
              : editorState.isHeading5 ? "heading5"
              : editorState.isHeading6 ? "heading6"
              : "paragraph"
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Paragraph" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paragraph">Paragraph</SelectItem>
            <SelectItem value="heading1">H1 Heading 1</SelectItem>
            <SelectItem value="heading2">H2 Heading 2</SelectItem>
            <SelectItem value="heading3">H3 Heading 3</SelectItem>
            <SelectItem value="heading4">H4 Heading 4</SelectItem>
            <SelectItem value="heading5">H5 Heading 5</SelectItem>
            <SelectItem value="heading6">H6 Heading 6</SelectItem>
          </SelectContent>
        </Select>

        <Separator orientation="vertical" className="h-6" />

        <Toggle
          size="sm"
          pressed={editorState.isBold}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          onMouseDown={(e) => e.preventDefault()}
        >
          <BoldIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editorState.isItalic}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          onMouseDown={(e) => e.preventDefault()}
        >
          <ItalicIcon className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          size="sm"
          pressed={editorState.isUnderline}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          onMouseDown={(e) => e.preventDefault()}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Toggle>

        <Separator orientation="vertical" className="h-6" />

        <ColorPicker editor={editor} type="text">
          <Button 
            size="sm" 
            variant="outline"
            onMouseDown={(e) => e.preventDefault()}
          >
            <PaletteIcon className="h-4 w-4" />
          </Button>
        </ColorPicker>

        <ColorPicker editor={editor} type="highlight">
          <Button 
            size="sm" 
            variant="outline"
            onMouseDown={(e) => e.preventDefault()}
          >
            <HighlighterIcon className="h-4 w-4" />
          </Button>
        </ColorPicker>

        <FontSizePicker editor={editor} />

        <Separator orientation="vertical" className="h-6" />

        <Toggle
          size="sm"
          pressed={editorState.isBulletList}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          onMouseDown={(e) => e.preventDefault()}
        >
          <ListIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editorState.isOrderedList}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          onMouseDown={(e) => e.preventDefault()}
        >
          <ListOrderedIcon className="h-4 w-4" />
        </Toggle>
        
        <Separator orientation="vertical" className="h-6" />

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          onMouseDown={(e) => e.preventDefault()}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              size="sm" 
              variant="outline"
              onMouseDown={(e) => e.preventDefault()}
            >
              {editorState.textAlign === 'center' && <AlignCenterIcon className="h-4 w-4" />}
              {editorState.textAlign === 'right' && <AlignRightIcon className="h-4 w-4" />}
              {editorState.textAlign === 'justify' && <AlignJustifyIcon className="h-4 w-4" />}
              {editorState.textAlign === 'left' && <AlignLeftIcon className="h-4 w-4" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              onMouseDown={(e) => e.preventDefault()}
            >
              <AlignLeftIcon className="h-4 w-4 mr-2" />
              Align Left
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              onMouseDown={(e) => e.preventDefault()}
            >
              <AlignCenterIcon className="h-4 w-4 mr-2" />
              Align Center
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              onMouseDown={(e) => e.preventDefault()}
            >
              <AlignRightIcon className="h-4 w-4 mr-2" />
              Align Right
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              onMouseDown={(e) => e.preventDefault()}
            >
              <AlignJustifyIcon className="h-4 w-4 mr-2" />
              Justify
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="h-6" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              size="sm" 
              variant="outline"
              onMouseDown={(e) => e.preventDefault()}
            >
              <PlusIcon className="h-4 w-4" />
              More
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              onMouseDown={(e) => e.preventDefault()}
            >
              <CodeIcon className="h-4 w-4 mr-2" />
              Code Block
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={copyToClipboard}
              onMouseDown={(e) => e.preventDefault()}
            >
              <ClipboardIcon className="h-4 w-4 mr-2" />
              Copy to Clipboard
            </DropdownMenuItem>
            <DropdownMenuItem 
              onMouseDown={(e) => e.preventDefault()}
            >
              <AnchorIcon className="h-4 w-4 mr-2" />
              Copy Anchor Link
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={resetFormatting}
              onMouseDown={(e) => e.preventDefault()}
            >
              <Trash2Icon className="h-4 w-4 mr-2" />
              Reset All Formatting
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="h-6" />

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          aria-label="Undo"
          onMouseDown={(e) => e.preventDefault()}
        >
          <UndoIcon className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          aria-label="Redo"
          onMouseDown={(e) => e.preventDefault()}
        >
          <RedoIcon className="h-4 w-4" />
        </Button>
      </div>

      {}
      {isImageSelected && <ImageResizeControls editor={editor} />}
    </div>
  );
};



function LinkComponent({
  editor,
  children,
}: {
  editor: Editor;
  children: ReactNode;
}) {
  const [linkUrl, setLinkUrl] = useState("");
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);

  const handleSetLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    setIsLinkPopoverOpen(false);
    setLinkUrl("");
  };

  return (
    <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="flex flex-col gap-4">
          <h3 className="font-medium">Insert Link</h3>
          <Input
            placeholder="https://example.com"
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSetLink();
              }
            }}
          />
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setIsLinkPopoverOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSetLink}>Save</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function ColorPicker({
  editor,
  type = 'text',
  children,
}: {
  editor: Editor;
  type?: 'text' | 'highlight';
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleColorSelect = (color: string) => {
    if (type === 'text') {
      editor.chain().focus().setColor(color).run();
    } else {
      editor.chain().focus().toggleHighlight({ color }).run();
    }
    setIsOpen(false);
  };

  const clearColor = () => {
    if (type === 'text') {
      editor.chain().focus().unsetColor().run();
    } else {
      editor.chain().focus().unsetHighlight().run();
    }
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4">
        <div className="flex flex-col gap-4">
          <h3 className="font-medium">
            {type === 'text' ? 'Text Color' : 'Highlight Color'}
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {(type === 'text' ? colorPalette : highlightColors).map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded border border-gray-200"
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
                title={color}
              />
            ))}
          </div>
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={clearColor}>
              Clear
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function FontSizePicker({ editor }: { editor: Editor }) {
  const [isOpen, setIsOpen] = useState(false);
  const currentFontSize = editor.getAttributes('textStyle').fontSize || 'Default';

  const handleFontSizeSelect = (size: string) => {
    editor.chain().focus().setMark('textStyle', { fontSize: size }).run();
    setIsOpen(false);
  };

  const clearFontSize = () => {
    editor.chain().focus().unsetMark('textStyle').run();
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          size="sm" 
          variant="outline" 
          className="w-[120px] justify-between"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          <div className="flex items-center truncate">
            <TypeIcon className="h-4 w-4 mr-2" />
            <span className="truncate">{currentFontSize}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-48 max-h-[300px] overflow-y-auto"
        align="start"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          editor.commands.focus();
        }}
      >
        <DropdownMenuItem 
          onClick={() => clearFontSize()}
          onMouseDown={(e) => e.preventDefault()}
          className="cursor-pointer"
        >
          <span>Default</span>
        </DropdownMenuItem>
        {fontSizes.map((size) => (
          <DropdownMenuItem
            key={size}
            onClick={() => handleFontSizeSelect(size)}
            onMouseDown={(e) => e.preventDefault()}
            className="cursor-pointer flex items-center justify-between"
          >
            <span style={{ fontSize: size }}>{size}</span>
            {currentFontSize === size && <CheckSquareIcon className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function EnhancedBubbleMenu({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        isHighlight: ctx.editor.isActive("highlight") ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        isLink: ctx.editor.isActive("link") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
      };
    },
  });

  return (
    <TiptapBubbleMenu
      editor={editor}
      className="bg-background flex items-center rounded-md border shadow-md relative z-50 p-1 gap-1"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="ghost">
            {editorState.isHeading1 && <Heading1 className="h-4 w-4" />}
            {editorState.isHeading2 && <Heading2 className="h-4 w-4" />}
            {editorState.isHeading3 && <Heading3 className="h-4 w-4" />}
            {!editorState.isHeading1 && !editorState.isHeading2 && !editorState.isHeading3 && "H"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem 
            onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
            onMouseDown={(e) => e.preventDefault()}
          >
            <Heading1 className="h-4 w-4 mr-2" />
            Heading 1
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
            onMouseDown={(e) => e.preventDefault()}
          >
            <Heading2 className="h-4 w-4 mr-2" />
            Heading 2
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}
            onMouseDown={(e) => e.preventDefault()}
          >
            <Heading3 className="h-4 w-4 mr-2" />
            Heading 3
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => editor.chain().focus().setParagraph().run()}
            onMouseDown={(e) => e.preventDefault()}
          >
            P
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Toggle
        size="sm"
        pressed={editorState.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Toggle bold"
        onMouseDown={(e) => e.preventDefault()}
      >
        <BoldIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Toggle italic"
        onMouseDown={(e) => e.preventDefault()}
      >
        <ItalicIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isUnderline}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="Toggle underline"
        onMouseDown={(e) => e.preventDefault()}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isStrike}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        aria-label="Toggle strikethrough"
        onMouseDown={(e) => e.preventDefault()}
      >
        <StrikethroughIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isCode}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        aria-label="Toggle code"
        onMouseDown={(e) => e.preventDefault()}
      >
        <CodeIcon className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="h-6" />

      <ColorPicker editor={editor} type="text">
        <Button 
          size="sm" 
          variant="ghost"
          onMouseDown={(e) => e.preventDefault()}
        >
          <PaletteIcon className="h-4 w-4" />
        </Button>
      </ColorPicker>

      <ColorPicker editor={editor} type="highlight">
        <Button 
          size="sm" 
          variant="ghost"
          onMouseDown={(e) => e.preventDefault()}
        >
          <HighlighterIcon className="h-4 w-4" />
        </Button>
      </ColorPicker>

      <Separator orientation="vertical" className="h-6" />

      {editorState.isLink ? (
        <Toggle
          pressed
          onPressedChange={() =>
            editor.chain().focus().extendMarkRange("link").unsetLink().run()
          }
          onMouseDown={(e) => e.preventDefault()}
        >
          <UnlinkIcon className="h-4 w-4" />
        </Toggle>
      ) : (
        <LinkComponent editor={editor}>
          <Toggle 
            size="sm" 
            aria-label="Toggle link"
            onMouseDown={(e) => e.preventDefault()}
          >
            <LinkIcon className="h-4 w-4" />
          </Toggle>
        </LinkComponent>
      )}
    </TiptapBubbleMenu>
  );
}

function EnhancedFloatingMenu({ editor }: { editor: Editor }) {
  return (
    <TiptapFloatingMenu
      editor={editor}
      className="bg-background flex items-center rounded-md border shadow-md relative z-50 p-1 gap-1"
    >
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Heading1 className="h-4 w-4" />
      </Button>

      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Heading2 className="h-4 w-4" />
      </Button>

      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Heading3 className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6" />

      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        onMouseDown={(e) => e.preventDefault()}
      >
        <ListIcon className="h-4 w-4" />
      </Button>

      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        onMouseDown={(e) => e.preventDefault()}
      >
        <ListOrderedIcon className="h-4 w-4" />
      </Button>

      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        onMouseDown={(e) => e.preventDefault()}
      >
        <CheckSquareIcon className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6" />

      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Quote className="h-4 w-4" />
      </Button>

      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        onMouseDown={(e) => e.preventDefault()}
      >
        <CodeIcon className="h-4 w-4" />
      </Button>
    </TiptapFloatingMenu>
  );
}