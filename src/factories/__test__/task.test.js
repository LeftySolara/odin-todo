import { describe, expect, test } from '@jest/globals';
import createTask from '../task';

describe('task factory', () => {
  describe('when creating a task', () => {
    const exampleTitle = 'Take out trash';
    const exampleDescription =
      'The trash needs to be taken out before Monday night.';
    test('should set the title and description if given', () => {
      const task = createTask({
        id: 0,
        title: exampleTitle,
        description: exampleDescription,
      });

      expect(task.title).toBe(exampleTitle);
      expect(task.description).toBe(exampleDescription);
    });

    test('should create a task if given a title and no description', () => {
      const task = createTask({ id: 0, title: exampleTitle });

      expect(task.title).toBe(exampleTitle);
      expect(task.description).toBe(undefined);
    });

    test('should return null when no title is given', () => {
      const task = createTask({});
      expect(task).toBeNull();
    });
  });

  describe('when editing a task', () => {
    let exampleTask;

    beforeEach(() => {
      exampleTask = createTask({
        id: 0,
        title: 'Example task',
        description: 'Needs to be done',
      });
    });

    test('should allow the creation of subtasks', () => {
      expect(exampleTask.subtaskCount()).toBe(0);
      exampleTask.addSubtask('This is a subtask');
      expect(exampleTask.subtaskCount()).toBe(1);
    });

    describe('when deleting subtasks', () => {
      test('should do nothing if no subtasks exist', () => {
        exampleTask.deleteSubtask(0);
        expect(exampleTask.subtaskCount()).toBe(0);
      });

      test('should allow the deletion of subtasks', () => {
        exampleTask.addSubtask('Subtask1');
        exampleTask.addSubtask('Subtask2');
        exampleTask.addSubtask('Subtask3');
        exampleTask.deleteSubtask(1);

        expect(exampleTask.subtaskCount()).toBe(2);
      });

      test('should do nothing if requested task is not in list', () => {
        exampleTask.addSubtask('Subtask1');
        exampleTask.addSubtask('Subtask2');
        exampleTask.deleteSubtask(5);

        expect(exampleTask.subtaskCount()).toBe(2);
      });
    });
  });
});
