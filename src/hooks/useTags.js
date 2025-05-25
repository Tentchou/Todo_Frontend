import { useContext } from 'react';
import { TagContext } from '../contexts/TagContext';

export const useTags = () => {
  return useContext(TagContext);
};