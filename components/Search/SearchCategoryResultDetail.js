import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import SearchResultButton from '../common/SearchResultButton';

const SearchCategoryResultDetail = (props) => {
  const { category, onPress } = props;
  return (
    <SearchResultButton
      onPress={onPress}
    >
      {category.title}
    </SearchResultButton>
  );
};

export default SearchCategoryResultDetail;
