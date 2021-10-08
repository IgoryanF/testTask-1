import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchFakeData} from "../redux/fake-data-reducer";
import DataItem from "./DataItem";
import {Flex, Item, Spinner} from "../Styled";
import BlockModal from "./BlockModal";

const size = 12;

const convertDate = (timeStamp) => {
    const dateFormat = new Date(timeStamp);
    return `${dateFormat.getDate()}/${dateFormat.getMonth() + 1}/${dateFormat.getFullYear()}`
}

const convertObjectToArray = (obj) => {
    return Object.entries(obj);
}

const getPageSize = (totalCount, size) => {
    return Math.ceil(totalCount / size);
}


const DataList = () => {

    const dispatch = useDispatch();

    const [currentPosition, setCurrentPosition] = useState(1);

    const nextPosition = () => {
        setCurrentPosition(prevState => prevState + 1)
    }

    const previousPosition = () => {
        setCurrentPosition(prevState => prevState - 1)
    }

    const {isFetching, rates, timestamp, error} = useSelector(state => state.fakeDataReducer);

    const date = useMemo(() => {
        return convertDate(timestamp)
    }, [timestamp]);

    const [data, countItems] = useMemo(() => {
        const data = convertObjectToArray(rates);
        return [data, getPageSize(data.length, size)];
    }, [rates])


    console.log(data.length)

    const [startSlice, endSlice] = useMemo(() => {
        if (currentPosition === 1) {
            return [currentPosition - 1, currentPosition * size ];
        } else if (currentPosition === data.length) {
            return [(currentPosition - 1) * size, data.length + 1];
        } else {
            return [(currentPosition - 1) * size, currentPosition * size];
        }
    }, [currentPosition, data.length]);


    useEffect(() => {
        dispatch(fetchFakeData({ms: 2000}));
    }, [dispatch]);


    return (
        <div>
            {isFetching &&
            <BlockModal>
                <Spinner/>
            </BlockModal>
            }

            {error && <h1>Произогла ошибка: {error}</h1>}

            {!isFetching && !error &&
            <Flex column>
                {timestamp && <div className="title">Стоимость <b>1 USD</b> в период {date}</div>}
                <Flex column border={!isFetching}>
                    <Flex border withItem>
                        <Item size={1.3}><b>Id</b></Item>
                        <Item size={1.3}><b>Валюта</b></Item>
                        <Item size={1.3}><b>Стоимость</b></Item>
                    </Flex>
                    {data.slice(startSlice, endSlice).map(([key, value], index) =>
                        <DataItem
                            key={key}
                            currencyName={key}
                            value={value}
                            index={startSlice + index + 1}
                        />
                    )}
                </Flex>
                <Flex>
                    <span className="position"><b>{currentPosition}</b>{" из " + countItems}</span>
                    <button
                        disabled={currentPosition === 1}
                        onClick={() => previousPosition()}
                    >
                        Пред.
                    </button>
                    <button
                        disabled={currentPosition === countItems}
                        onClick={() => nextPosition()}
                    >
                        След.
                    </button>
                </Flex>
            </Flex>
            }

        </div>
    );
};

export default DataList;