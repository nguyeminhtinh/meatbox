// @flow
import React, { memo, useState } from 'react';
import Checkbox from 'components/Checkbox';

type Props = {
  rowItem: Object,
  isShowImage?: boolean,
  handleCheckBox: Function,
  isShowId?: boolean,
  listId: Array
};

const TableRowProduct = ({
  rowItem,
  isShowImage,
  handleCheckBox,
  isShowId,
  listId
}: Props) => {
  const fieldId = 'id';
  const [checkedItems, setCheckedItems] = useState({});
  const handleChange = event => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked
    });
    handleCheckBox([rowItem.id]);
  };
  const renderImage = item => {
    return (
      // eslint-disable-next-line jsx-a11y/alt-text
      <img className="d-block" src={item.image} />
    );
  };

  return (
    <tr className="table-list-product">
      <td>
        <Checkbox
          label=""
          checked={!!listId.includes(rowItem.id)}
          onChange={handleChange}
          name={rowItem && rowItem.id}
        />
      </td>
      {Object.keys(rowItem).map(item => (
        <td
          key={item}
          className={`${
            // eslint-disable-next-line no-nested-ternary
            rowItem.status === 1
              ? 'active'
              : isShowId && item === fieldId
              ? 'd-none'
              : ''
          }`}
        >
          {isShowImage && item === 'image'
            ? renderImage(rowItem)
            : rowItem[item]}
        </td>
      ))}
    </tr>
  );
};
TableRowProduct.defaultProps = { isShowImage: false, isShowId: false };
export default memo<Props>(TableRowProduct);
