import { describe, expect, test } from '@jest/globals';
import createTask from '../task';

describe('task factory', () => {
  describe('when creating a task', () => {
    const exampleTitle = 'Take out trash';
    const exampleDescription =
      'The trash needs to be taken out before Monday night.';
    test('should set the title and description if given', () => {
      const task = createTask(0, exampleTitle, exampleDescription);

      expect(task.title).toBe(exampleTitle);
      expect(task.description).toBe(exampleDescription);
    });

    test('should create a task if given a title and no description', () => {
      const task = createTask(0, exampleTitle);

      expect(task.title).toBe(exampleTitle);
      expect(task.description).toBe('');
    });

    test('should return null when no title is given', () => {
      const task = createTask(0);
      expect(task).toBeNull();
    });
  });
});
