import { Reply } from "src/database/entities/Reply";
import { ReplySnippet } from "src/database/entities/ReplySnippet";
import { Thread } from "src/database/entities/Thread";
import { ThreadSnippet } from "src/database/entities/ThreadSnippet"

const ANONYMOUS_USER: string = "Anonymous User";

export const mapThreadResponse = (thread: Thread) => {
    return {
        id: thread.id,
        message: thread.message,
        username: thread.anonymous ? ANONYMOUS_USER : thread.user?.name,
        replyCount: thread.replyCount,
        threadCreationTime : thread.createdAt,
        lastReplied: thread.replies.length > 0 ? thread.replies[0].createdAt : null,
        snippets: thread.snippets.map(mapSnippetResponse),
        delta: thread.delta
    }
}

export const mapReplyResponse = (reply: Reply) => {
    return {
        id: reply.id,
        message: reply.message,
        username: reply.anonymous ? ANONYMOUS_USER : reply.user?.name,
        replyCreationTime : reply.createdAt,
        snippets: reply.snippets.map(mapSnippetResponse),
        delta: reply.delta
    }
}

export const mapSnippetResponse = (snippet: ThreadSnippet | ReplySnippet) => {
    return {
        id: snippet.id,
        text: snippet.text,
        filePath: snippet.filePath,
        lineStart: snippet.lineStart,
    }
}