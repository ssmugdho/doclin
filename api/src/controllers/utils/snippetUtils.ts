import { Reply } from 'src/database/entities/Reply';
import { Thread } from '../../database/entities/Thread';
import { RequestSnippetBlot } from 'src/types/types';

export const MULTIPLE_LINE_BREAK_REGEX: RegExp = /(<p><br><\/p>)+/gi;
export const SINGLE_LINE_BREAK: string = '<p><br></p>';

export const getSnippetTag = (snippetId: number) => {
  return `[snippet_${snippetId}]`;
};

export const fillUpThreadOrReplyMessageWithSnippet = (message: string, snippetblots: RequestSnippetBlot[]): string => {
  for (const snippet of snippetblots) {
    message = message.replace(
      getSnippetTag(snippet.index),
      `\nIn ${snippet.filePath}:\n<pre>${snippet.originalSnippet}</pre>\n`
    );
  }

  return message;
};

export const getThreadText = (thread: Thread | Reply): string => {
  let message = thread.message;

  if (thread.snippets) {
    for (const snippet of thread.snippets) {
      message = message.replace(getSnippetTag(snippet.id), `\nIn ${snippet.filePath}:\n<pre>${snippet.text}</pre>\n`);
    }
  }

  return message;
};
