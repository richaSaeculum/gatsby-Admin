import RichTextEditor from "@mantine/rte";
import { ToolbarControl } from "@mantine/rte/lib/components/Toolbar/controls";
import { useCallback } from 'react';

type Props = {
  value: string
  onChange: (value: any) => void
  disabled: boolean
}

export const Editor = ({
  value,
  onChange,
  disabled
}: Props) => {

  const controls: ToolbarControl[][] = [
    ['bold', 'strike', 'italic', 'underline', 'clean'],
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    ['unorderedList', 'orderedList'],
    ['link', 'image', 'video', 'blockquote', 'code'],
    ['alignLeft', 'alignCenter', 'alignRight'],
    ['sup', 'sub'],
  ]

  const handleImageUpload = useCallback((): any => {
    return new Promise((res, rej) => res('https://stat1.bollywoodhungama.in/wp-content/uploads/2022/09/6d6639f3-0eaf-46af-89b8-fc466e43a85b.jpg'))
  }, [])

  return (
    <div className="text-editor">
      <RichTextEditor
        id="rte"
        value={value}
        onChange={(e) => { onChange({ target: { name: 'content', value: e } }) }}
        controls={controls}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
};

export default Editor;

