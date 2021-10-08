import React from 'react';
import {Flex, Item} from "../Styled";

const DataItem = ({currencyName, value, index}) => {
    return (
        <Flex border withItem>
            <Item>{index}</Item>
            <Item>{currencyName}</Item>
            <Item>{value}</Item>
        </Flex>
    )
}

export default DataItem;