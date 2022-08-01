import React from "react";
import RichTextEditor, { EditorValue, ToolbarConfig } from "react-rte";

type Props = {
  value: EditorValue
  onChange: (value: any) => void
}

export const Editor = ({
  value,
  onChange
}: Props) => {

  const toolbarConfig: ToolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS','LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS', 'IMAGE_BUTTON',],
    INLINE_STYLE_BUTTONS: [
      { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
      { label: 'Italic', style: 'ITALIC' },
      { label: 'Underline', style: 'UNDERLINE' }
    ],
    BLOCK_TYPE_DROPDOWN: [
      { label: 'Normal', style: 'unstyled' },
      { label: 'Heading 1', style: 'header-one' },
      { label: 'Heading 2', style: 'header-two' },
      { label: 'Heading 3', style: 'header-three' },
      { label: 'Heading 4', style: 'header-four' },
      { label: 'Heading 5', style: 'header-five' },
      { label: 'Heading 6', style: 'header-six' }
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: 'UL', style: 'unordered-list-item' },
      { label: 'OL', style: 'ordered-list-item' },
      { label: "Blockquote", style: "blockquote" }
    ],
  };

  return (
    <div className="text-editor">
      <RichTextEditor
        value={value}
        onChange={(value) => onChange({ target: { name: 'content', value: value } })}
        toolbarConfig={toolbarConfig}
      />
    </div>
  );
};

export default Editor;

