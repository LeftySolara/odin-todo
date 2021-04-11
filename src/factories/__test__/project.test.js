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
      project.addTask('Write unit tests', 'The tests need to be written!');
      project.addTask('Create git repo', 'Version control is important!');
      expect(project.taskCount()).toBe(2);
    });
  });

  describe('when deleting tasks', () => {
    let project;

    beforeEach(() => {
      project = createProject();
      project.addTask('Task0', 'Description0');
      project.addTask('Task1', 'Description1');
    });

    test('should remove tasks from the list', () => {
      project.deleteTask(1);
      expect(project.taskCount()).toBe(1);
    });
  });
});
