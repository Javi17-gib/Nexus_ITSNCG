import type React from "react";

import {
    useEffect,
} from "react";

import type {
    ReactNode,
} from "react";

import {
    EditorContent,
    useEditor,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

import {
    TextStyleKit,
} from "@tiptap/extension-text-style";

import Highlight from "@tiptap/extension-highlight";

import TextAlign from "@tiptap/extension-text-align";

import {
    Mark,
} from "@tiptap/core";

import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Undo2,
    Redo2,
    Highlighter,
    Palette,
} from "lucide-react";


/*
|--------------------------------------------------------------------------
| SUBRAYADO
|--------------------------------------------------------------------------
|
| Lo definimos aquí para no obligarte a instalar otro paquete.
|
*/

const NexusUnderline = Mark.create({
    name: "underline",

    parseHTML() {
        return [
            {
                tag: "u",
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            "u",
            HTMLAttributes,
            0,
        ];
    },

});


interface RichTextEditorProps {

    value: string;

    onChange: (
        value: string
    ) => void;

    disabled?: boolean;

    placeholder?: string;

}


export default function RichTextEditor({

    value,

    onChange,

    disabled = false,

    placeholder =
        "Escribe el contenido educativo...",

}: RichTextEditorProps) {


    const editor = useEditor({

        extensions: [

            StarterKit,

            TextStyleKit,

            Highlight.configure({
                multicolor: true,
            }),

            TextAlign.configure({
                types: [
                    "heading",
                    "paragraph",
                ],
            }),

            NexusUnderline,

        ],

        content:
            value || "",

        editable:
            !disabled,

        onUpdate: ({
            editor,
        }) => {

            onChange(
                editor.getHTML()
            );

        },

    });


    /*
    |--------------------------------------------------------------------------
    | SINCRONIZAR CUANDO SE EDITA UN CONTENIDO EXISTENTE
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!editor) {
            return;
        }

        const html =
            value || "";

        if (
            editor.getHTML() !==
            html
        ) {

            editor.commands.setContent(
                html,
                {
                    emitUpdate: false,
                }
            );

        }

    }, [
        editor,
        value,
    ]);


    /*
    |--------------------------------------------------------------------------
    | EDITABLE / DISABLED
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!editor) {
            return;
        }

        editor.setEditable(
            !disabled
        );

    }, [
        editor,
        disabled,
    ]);


    if (!editor) {

        return (
            <div
                className="
                    rounded-2xl
                    border
                    border-[var(--nexus-border)]
                    bg-[var(--nexus-bg)]
                    min-h-[340px]
                    flex
                    items-center
                    justify-center
                    text-sm
                    text-[var(--nexus-text-muted)]
                "
            >
                Cargando editor...
            </div>
        );

    }


    const ToolbarButton = ({
        label,
        title,
        active = false,
        onClick,
        disabled: buttonDisabled = false,
    }: {
        label: ReactNode;
        title: string;
        active?: boolean;
        onClick: () => void | boolean;
        disabled?: boolean;
    }) => (

        <button
            type="button"
            title={title}
            disabled={
                disabled ||
                buttonDisabled
            }
            onMouseDown={(e) => {
                e.preventDefault();
            }}
            onClick={onClick}
            className={`
                h-9
                min-w-9
                px-2
                rounded-lg
                flex
                items-center
                justify-center
                transition
                border
                ${
                    active
                        ? "bg-violet-500/20 border-violet-400/30 text-violet-300"
                        : "bg-white/[0.025] border-white/[0.06] text-[var(--nexus-text-secondary)] hover:bg-white/[0.07] hover:text-white"
                }
                disabled:opacity-40
                disabled:cursor-not-allowed
            `}
        >
            {label}
        </button>

    );


    return (

        <div
            className="
                overflow-hidden
                rounded-2xl
                border
                border-[var(--nexus-border)]
                bg-[var(--nexus-bg)]
                shadow-[0_20px_60px_rgba(0,0,0,0.20)]
            "
        >

            {/* =========================================================
                TOOLBAR
            ========================================================= */}

            <div
                className="
                    sticky
                    top-0
                    z-10
                    flex
                    flex-wrap
                    items-center
                    gap-1.5
                    p-2
                    border-b
                    border-[var(--nexus-border)]
                    bg-[#090A14]/95
                    backdrop-blur-xl
                "
            >

                {/* FORMATO */}

                <ToolbarButton
                    label={
                        <Bold
                            size={17}
                        />
                    }
                    title="Negrita"
                    active={editor.isActive(
                        "bold"
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                />

                <ToolbarButton
                    label={
                        <Italic
                            size={17}
                        />
                    }
                    title="Cursiva"
                    active={editor.isActive(
                        "italic"
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                />

                <ToolbarButton
                    label={
                        <UnderlineIcon
                            size={17}
                        />
                    }
                    title="Subrayado"
                    active={editor.isActive(
                        "underline"
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleMark(
                                "underline"
                            )
                            .run()
                    }
                />

                <ToolbarButton
                    label={
                        <Strikethrough
                            size={17}
                        />
                    }
                    title="Tachado"
                    active={editor.isActive(
                        "strike"
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleStrike()
                            .run()
                    }
                />


                <span
                    className="
                        mx-1
                        h-6
                        w-px
                        bg-white/10
                    "
                />


                {/* ENCABEZADOS */}

                <select
                    title="Estilo del texto"
                    value={
                        editor.isActive(
                            "heading",
                            {
                                level: 1,
                            }
                        )
                            ? "h1"
                            : editor.isActive(
                                "heading",
                                {
                                    level: 2,
                                }
                            )
                                ? "h2"
                                : editor.isActive(
                                    "heading",
                                    {
                                        level: 3,
                                    }
                                )
                                    ? "h3"
                                    : "p"
                    }
                    disabled={disabled}
                    onChange={(e) => {

                        const value =
                            e.target.value;

                        if (
                            value === "p"
                        ) {

                            editor
                                .chain()
                                .focus()
                                .setParagraph()
                                .run();

                            return;

                        }

                        editor
                            .chain()
                            .focus()
                            .toggleHeading({
                                level:
                                    Number(
                                        value.replace(
                                            "h",
                                            ""
                                        )
                                    ) as 1 | 2 | 3,
                            })
                            .run();

                    }}
                    className="
                        h-9
                        rounded-lg
                        border
                        border-white/[0.06]
                        bg-white/[0.025]
                        px-2
                        text-xs
                        text-[var(--nexus-text-secondary)]
                        outline-none
                        cursor-pointer
                    "
                >

                    <option
                        value="p"
                        className="bg-[#090A14]"
                    >
                        Párrafo
                    </option>

                    <option
                        value="h1"
                        className="bg-[#090A14]"
                    >
                        Título 1
                    </option>

                    <option
                        value="h2"
                        className="bg-[#090A14]"
                    >
                        Título 2
                    </option>

                    <option
                        value="h3"
                        className="bg-[#090A14]"
                    >
                        Título 3
                    </option>

                </select>


                {/* FUENTE */}

                <select
                    title="Tipo de letra"
                    disabled={disabled}
                    defaultValue=""
                    onChange={(e) => {

                        if (
                            !e.target.value
                        ) {
                            return;
                        }

                        editor
                            .chain()
                            .focus()
                            .setFontFamily(
                                e.target.value
                            )
                            .run();

                    }}
                    className="
                        h-9
                        max-w-32
                        rounded-lg
                        border
                        border-white/[0.06]
                        bg-white/[0.025]
                        px-2
                        text-xs
                        text-[var(--nexus-text-secondary)]
                        outline-none
                        cursor-pointer
                    "
                >

                    <option
                        value=""
                        className="bg-[#090A14]"
                    >
                        Fuente
                    </option>

                    <option
                        value="Inter"
                        className="bg-[#090A14]"
                    >
                        Inter
                    </option>

                    <option
                        value="Arial"
                        className="bg-[#090A14]"
                    >
                        Arial
                    </option>

                    <option
                        value="Georgia"
                        className="bg-[#090A14]"
                    >
                        Georgia
                    </option>

                    <option
                        value="Verdana"
                        className="bg-[#090A14]"
                    >
                        Verdana
                    </option>

                    <option
                        value="Courier New"
                        className="bg-[#090A14]"
                    >
                        Courier New
                    </option>

                </select>


                {/* TAMAÑO */}

                <select
                    title="Tamaño"
                    disabled={disabled}
                    defaultValue=""
                    onChange={(e) => {

                        if (
                            !e.target.value
                        ) {
                            return;
                        }

                        editor
                            .chain()
                            .focus()
                            .setFontSize(
                                e.target.value
                            )
                            .run();

                    }}
                    className="
                        h-9
                        w-20
                        rounded-lg
                        border
                        border-white/[0.06]
                        bg-white/[0.025]
                        px-2
                        text-xs
                        text-[var(--nexus-text-secondary)]
                        outline-none
                        cursor-pointer
                    "
                >

                    <option
                        value=""
                        className="bg-[#090A14]"
                    >
                        Tamaño
                    </option>

                    <option
                        value="12px"
                        className="bg-[#090A14]"
                    >
                        12
                    </option>

                    <option
                        value="14px"
                        className="bg-[#090A14]"
                    >
                        14
                    </option>

                    <option
                        value="16px"
                        className="bg-[#090A14]"
                    >
                        16
                    </option>

                    <option
                        value="18px"
                        className="bg-[#090A14]"
                    >
                        18
                    </option>

                    <option
                        value="20px"
                        className="bg-[#090A14]"
                    >
                        20
                    </option>

                    <option
                        value="24px"
                        className="bg-[#090A14]"
                    >
                        24
                    </option>

                    <option
                        value="28px"
                        className="bg-[#090A14]"
                    >
                        28
                    </option>

                </select>


                <span
                    className="
                        mx-1
                        h-6
                        w-px
                        bg-white/10
                    "
                />


                {/* LISTAS */}

                <ToolbarButton
                    label={
                        <List
                            size={17}
                        />
                    }
                    title="Lista con viñetas"
                    active={editor.isActive(
                        "bulletList"
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleBulletList()
                            .run()
                    }
                />

                <ToolbarButton
                    label={
                        <ListOrdered
                            size={17}
                        />
                    }
                    title="Lista numerada"
                    active={editor.isActive(
                        "orderedList"
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleOrderedList()
                            .run()
                    }
                />


                {/* ALINEACIÓN */}

                <ToolbarButton
                    label={
                        <AlignLeft
                            size={17}
                        />
                    }
                    title="Alinear izquierda"
                    active={editor.isActive(
                        {
                            textAlign:
                                "left",
                        }
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .setTextAlign(
                                "left"
                            )
                            .run()
                    }
                />

                <ToolbarButton
                    label={
                        <AlignCenter
                            size={17}
                        />
                    }
                    title="Centrar"
                    active={editor.isActive(
                        {
                            textAlign:
                                "center",
                        }
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .setTextAlign(
                                "center"
                            )
                            .run()
                    }
                />

                <ToolbarButton
                    label={
                        <AlignRight
                            size={17}
                        />
                    }
                    title="Alinear derecha"
                    active={editor.isActive(
                        {
                            textAlign:
                                "right",
                        }
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .setTextAlign(
                                "right"
                            )
                            .run()
                    }
                />

                <ToolbarButton
                    label={
                        <AlignJustify
                            size={17}
                        />
                    }
                    title="Justificar"
                    active={editor.isActive(
                        {
                            textAlign:
                                "justify",
                        }
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .setTextAlign(
                                "justify"
                            )
                            .run()
                    }
                />


                {/* COLOR */}

                <label
                    title="Color del texto"
                    className="
                        relative
                        h-9
                        min-w-9
                        px-2
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        gap-1
                        border
                        border-white/[0.06]
                        bg-white/[0.025]
                        text-[var(--nexus-text-secondary)]
                        hover:bg-white/[0.07]
                        cursor-pointer
                    "
                >

                    <Palette
                        size={16}
                    />

                    <input
                        type="color"
                        defaultValue="#EDECF6"
                        disabled={disabled}
                        onChange={(e) =>
                            editor
                                .chain()
                                .focus()
                                .setColor(
                                    e.target.value
                                )
                                .run()
                        }
                        className="
                            absolute
                            inset-0
                            opacity-0
                            cursor-pointer
                        "
                    />

                </label>


                {/* RESALTADO */}

                <label
                    title="Color de resaltado"
                    className="
                        relative
                        h-9
                        min-w-9
                        px-2
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        gap-1
                        border
                        border-white/[0.06]
                        bg-white/[0.025]
                        text-[var(--nexus-text-secondary)]
                        hover:bg-white/[0.07]
                        cursor-pointer
                    "
                >

                    <Highlighter
                        size={16}
                    />

                    <input
                        type="color"
                        defaultValue="#6D28D9"
                        disabled={disabled}
                        onChange={(e) =>
                            editor
                                .chain()
                                .focus()
                                .toggleHighlight({
                                    color:
                                        e.target.value,
                                })
                                .run()
                        }
                        className="
                            absolute
                            inset-0
                            opacity-0
                            cursor-pointer
                        "
                    />

                </label>


                <span
                    className="
                        mx-1
                        h-6
                        w-px
                        bg-white/10
                    "
                />


                {/* DESHACER / REHACER */}

                <ToolbarButton
                    label={
                        <Undo2
                            size={17}
                        />
                    }
                    title="Deshacer"
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .undo()
                            .run()
                    }
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .undo()
                            .run()
                    }
                />

                <ToolbarButton
                    label={
                        <Redo2
                            size={17}
                        />
                    }
                    title="Rehacer"
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .redo()
                            .run()
                    }
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .redo()
                            .run()
                    }
                />

            </div>


            {/* =========================================================
                EDITOR
            ========================================================= */}

            <div
                className="
                    max-h-[430px]
                    min-h-[300px]
                    overflow-y-auto
                    nexus-editor-scroll
                "
            >

                <EditorContent
                    editor={editor}
                    className="
                        nexus-rich-editor
                        px-5
                        py-5
                    "
                />

            </div>


            {/* =========================================================
                ESTILOS DEL EDITOR
            ========================================================= */}

            <style>
                {`
                    .nexus-rich-editor .ProseMirror {
                        min-height: 260px;
                        outline: none;
                        color: var(--nexus-text);
                        font-size: 15px;
                        line-height: 1.8;
                    }

                    .nexus-rich-editor .ProseMirror > *:first-child {
                        margin-top: 0;
                    }

                    .nexus-rich-editor .ProseMirror p {
                        margin: 0 0 0.9rem 0;
                    }

                    .nexus-rich-editor .ProseMirror h1 {
                        margin: 1.25rem 0 0.8rem;
                        font-size: 2rem;
                        line-height: 1.2;
                        font-weight: 800;
                        color: #ffffff;
                    }

                    .nexus-rich-editor .ProseMirror h2 {
                        margin: 1.1rem 0 0.65rem;
                        font-size: 1.55rem;
                        line-height: 1.25;
                        font-weight: 800;
                        color: #ffffff;
                    }

                    .nexus-rich-editor .ProseMirror h3 {
                        margin: 1rem 0 0.55rem;
                        font-size: 1.2rem;
                        line-height: 1.3;
                        font-weight: 750;
                        color: #ffffff;
                    }

                    .nexus-rich-editor .ProseMirror ul,
                    .nexus-rich-editor .ProseMirror ol {
                        margin: 0.5rem 0 1rem;
                        padding-left: 1.6rem;
                    }

                    .nexus-rich-editor .ProseMirror ul {
                        list-style: disc;
                    }

                    .nexus-rich-editor .ProseMirror ol {
                        list-style: decimal;
                    }

                    .nexus-rich-editor .ProseMirror li {
                        margin: 0.25rem 0;
                    }

                    .nexus-rich-editor .ProseMirror blockquote {
                        margin: 1rem 0;
                        padding: 0.8rem 1rem;
                        border-left: 3px solid #8b5cf6;
                        background: rgba(139, 92, 246, 0.07);
                        border-radius: 0.75rem;
                        color: var(--nexus-text-secondary);
                    }

                    .nexus-rich-editor .ProseMirror code {
                        padding: 0.15rem 0.35rem;
                        border-radius: 0.4rem;
                        background: rgba(255,255,255,0.06);
                        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                    }

                    .nexus-rich-editor .ProseMirror pre {
                        margin: 1rem 0;
                        padding: 1rem;
                        overflow-x: auto;
                        border-radius: 0.85rem;
                        background: #05060d;
                        border: 1px solid rgba(255,255,255,0.07);
                    }

                    .nexus-rich-editor .ProseMirror hr {
                        margin: 1.25rem 0;
                        border: 0;
                        border-top: 1px solid rgba(255,255,255,0.08);
                    }

                    .nexus-rich-editor .ProseMirror a {
                        color: #a78bfa;
                        text-decoration: underline;
                    }

                    .nexus-rich-editor .ProseMirror mark {
                        border-radius: 0.25rem;
                        padding: 0 0.15rem;
                    }

                    .nexus-rich-editor .ProseMirror p.is-editor-empty:first-child::before {
                        content: "${placeholder.replace(/"/g, '\\"')}";
                        color: rgba(255,255,255,0.35);
                        float: left;
                        height: 0;
                        pointer-events: none;
                    }

                    .nexus-editor-scroll::-webkit-scrollbar {
                        width: 7px;
                    }

                    .nexus-editor-scroll::-webkit-scrollbar-track {
                        background: rgba(255,255,255,0.02);
                    }

                    .nexus-editor-scroll::-webkit-scrollbar-thumb {
                        background: rgba(139,92,246,0.32);
                        border-radius: 999px;
                    }

                    .nexus-editor-scroll::-webkit-scrollbar-thumb:hover {
                        background: rgba(139,92,246,0.5);
                    }
                `}
            </style>

        </div>

    );

}
