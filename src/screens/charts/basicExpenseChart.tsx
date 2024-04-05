import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {style} from './style';
import {Text} from 'react-native-paper';
import {getBasicChartData} from '../../redux/reducers/historyReducer';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import showToast from '../../components/Toast';

const ExpenseChart = ({navigation, route}: any) => {
  const dispatch = useAppDispatch();
  const {basicChart} = useAppSelector(state => state.history);
  const data = route.params;
  useEffect(() => {
    dispatch(getBasicChartData(data));
  }, []);
  console.log(basicChart, 'basicchardata');
  return (
    <View
      style={{
        paddingVertical: 100,
        backgroundColor: '#34448B',
        flex: 1,
      }}>
      <View
        style={{
          margin: 20,
          padding: 16,
          borderRadius: 20,
          backgroundColor: '#232B5D',
          elevation: 5,
        }}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          Monthly Expense
        </Text>
        <View
          style={{
            padding: 20,
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <BarChart
            horizontal={false}
            barWidth={25 - (basicChart?.length - 1) * 2}
            barBorderRadius={4}
            frontColor="#12D4B4"
            gradientColor="#F9F871"
            data={basicChart}
            yAxisThickness={0}
            xAxisThickness={0}
            onPress={() => navigation.navigate('DetailedCharts')}
            onLongPress={(value: any) =>
              showToast(`On ${value.label} you have spend ${value.value} Rs`)
            }
          />
        </View>
      </View>
    </View>
  );
};

export default ExpenseChart;
