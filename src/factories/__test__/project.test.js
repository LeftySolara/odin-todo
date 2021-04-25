import { beforeEach, describe, expect, test } from '@jest/globals';
import createProject from '../project';

describe('project factory', () => {
  describe('when creating a project', () => {
    test('should have an empty list of tasks', () => {
      const project = createProject('Example Project');
      expect(project.taskCount()).toBe(0);
    });
  });

  describe('when creating tasks', () => {
    let project;

    beforeEach(() => {
      project = createProject('Example Project');
    });

    test('should add new tasks to the list', () => {
      project.addTask({
        title: 'Write unit tests',
        description: 'The tests need to be written!',
      });
      project.addTask({
        title: 'Create git repo',
        description: 'Version control is important!',
      });
      expect(project.taskCount()).toBe(2);
    });
  });

  describe('when deleting tasks', () => {
    let project;
    let uuid0;

    beforeEach(() => {
      project = createProject('Example');
      uuid0 = project.addTask({ title: 'Task0', description: 'Description0' });
      project.addTask({ title: 'Task1', description: 'Description1' });
    });

    test('should remove tasks from the list', () => {
      project.deleteTask(uuid0);
      expect(project.taskCount()).toBe(1);
    });
  });
});
