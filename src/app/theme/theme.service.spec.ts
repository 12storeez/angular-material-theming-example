import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let mockClassList: any;

  const spy = jasmine.createSpy();

  beforeEach(() => {
    mockClassList = {
      add: spy,
      remove: spy,
    };
    const document = {
      body: {
        classList: mockClassList,
      },
    };
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DOCUMENT,
          useValue: document,
        },
      ],
    });
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should isDark equal false as default', () => {
    expect(service.isDark$.getValue()).toBeFalsy();
  });

  it('should remove default class and add new', () => {
    service.toggle();
    expect(service.isDark$.getValue()).toBeTruthy();
    expect(mockClassList.remove).toHaveBeenCalledWith('light-theme');
    expect(mockClassList.add).toHaveBeenCalledWith('dark-theme');
  });
});
