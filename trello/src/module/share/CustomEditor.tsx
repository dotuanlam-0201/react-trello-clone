import React, { useRef } from 'react'
import Editor from '@monaco-editor/react';
const CustomEditor = () => {

    const editorRef = useRef(null);

    function handleEditorDidMount(editor: any) {
        // here is the editor instance
        // you can store it in `useRef` for further usage
        editorRef.current = editor;
    }

    return (
        <Editor
            height="200px"
            defaultValue="// some comment"
            onMount={handleEditorDidMount}
        />
    );
}

export default CustomEditor
