import Editor from '@monaco-editor/react';
import { useRef } from 'react';

interface IProps {
    onChange: (e?: string) => void
    text: string
}

const CustomEditor = (props: IProps) => {

    const editorRef = useRef(null);

    function handleEditorDidMount(editor: any) {
        // here is the editor instance
        // you can store it in `useRef` for further usage
        editorRef.current = editor;
    }

    return (
        <Editor
            onChange={props.onChange}
            height="200px"
            value={props.text}
            onMount={handleEditorDidMount}
        />
    );
}

export default CustomEditor
