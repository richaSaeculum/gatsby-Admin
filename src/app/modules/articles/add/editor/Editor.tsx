import { useCallback } from 'react';

import RichTextEditor from "@mantine/rte";
import { ToolbarControl } from "@mantine/rte/lib/components/Toolbar/controls";

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

  // const handleImageUpload = useCallback((file: File): any => {
  //   return new Promise((res, rej) => {
  //     const imgPayload = new FormData();
  //     imgPayload.append('image', file);

  //     const formData = new FormData();
  //     formData.append("file", file);
  //     //display spinner
  //     //send image to media library
  //     fetch('https://gatsby.saeculumsolutions.com/wp-json/wp/v2/media', {
  //       method: "POST",
  //       headers: {
  //         //when using FormData(), the 'Content-Type' will automatically be set to 'form/multipart'
  //         //so there's no need to set it here
  //         Authorization: "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZ2F0c2J5LnNhZWN1bHVtc29sdXRpb25zLmNvbSIsImlhdCI6MTY2NDM1Nzg5MywibmJmIjoxNjY0MzU3ODkzLCJleHAiOjE2NjQ5NjI2OTMsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.2s48LePWdmiUBpmGREAuy0jpuRqhMhabsPTqmL_oLXc"
  //       },
  //       body: formData
  //     })
  //       .then(res => res.json())
  //       .then(data => {
  //         console.log(data)
  //         const input = {
  //           profile_image: data.source_url
  //         };
  //         res(data.source_url)
  //         //send image url to backend
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   })
  // }, [])

  return (
    <div className="text-editor">
      <RichTextEditor
        id="rte"
        value={value}
        onChange={(value, delta, source, editor) => { onChange({ target: { name: 'content', value } }) }}
        controls={controls}
        readOnly={disabled}
      // onImageUpload={handleImageUpload}
      />
    </div>
  );
};

export default Editor;

