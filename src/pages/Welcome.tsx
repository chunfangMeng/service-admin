import { PageContainer, ProCard, Statistic, StatisticCard } from '@ant-design/pro-components';
import { Divider } from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import React, { useState } from 'react';


const Welcome: React.FC = () => {
  const [responsive, setResponsive] = useState(false);
  // const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <div>
        <StatisticCard.Group className='mb-8' direction={responsive ? 'column' : 'row'}>
          <StatisticCard
            statistic={{
              title: '总流量(人次)',
              value: 601986875,
            }}
          />
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <StatisticCard
            statistic={{
              title: '付费流量',
              value: 3701928,
              description: <Statistic title="占比" value="61.5%" />,
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/ShNDpDTik/huan.svg"
                alt="百分比"
                width="100%"
              />
            }
            chartPlacement="left"
          />
          <StatisticCard
            statistic={{
              title: '免费流量',
              value: 1806062,
              description: <Statistic title="占比" value="38.5%" />,
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/6YR18tCxJ/huanlv.svg"
                alt="百分比"
                width="100%"
              />
            }
            chartPlacement="left"
          />
        </StatisticCard.Group>

        <StatisticCard.Group className='mb-8' direction={responsive ? 'column' : 'row'}>
          <StatisticCard
            statistic={{
              title: '冻结金额',
              value: 20190102,
              precision: 2,
              suffix: '元',
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/RLeBTRNWv/bianzu%25252043x.png"
                alt="直方图"
                width="100%"
              />
            }
          />
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <StatisticCard
            statistic={{
              title: '设计资源数',
              value: 234,
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/RLeBTRNWv/bianzu%25252043x.png"
                alt="直方图"
                width="100%"
              />
            }
          />
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <StatisticCard
            statistic={{
              title: '信息完成度',
              value: 5,
              suffix: '/ 100',
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/RLeBTRNWv/bianzu%25252043x.png"
                alt="直方图"
                width="100%"
              />
            }
          />
        </StatisticCard.Group>

        <ProCard split={responsive ? 'horizontal' : 'vertical'}>
          <StatisticCard
            colSpan={responsive ? 24 : 6}
            title="财年业绩目标"
            statistic={{
              value: 82.6,
              suffix: '亿',
              description: <Statistic title="日同比" value="6.47%" trend="up" />,
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/PmKfn4qvD/mubiaowancheng-lan.svg"
                alt="进度条"
                width="100%"
              />
            }
            footer={
              <>
                <Statistic
                  value="70.98%"
                  title="财年业绩完成率"
                  layout="horizontal"
                />
                <Statistic
                  value="86.98%"
                  title="去年同期业绩完成率"
                  layout="horizontal"
                />
                <Statistic
                  value="88.98%"
                  title="前年同期业绩完成率"
                  layout="horizontal"
                />
              </>
            }
          />
          <StatisticCard.Group
            colSpan={responsive ? 24 : 18}
            direction={responsive ? 'column' : undefined}
          >
            <StatisticCard
              statistic={{
                title: '财年总收入',
                value: 601987768,
                description: (
                  <Statistic title="日同比" value="6.15%" trend="up" />
                ),
              }}
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                  alt="折线图"
                  width="100%"
                />
              }
            >
              <Statistic
                title="大盘总收入"
                value={1982312}
                layout="vertical"
                description={
                  <Statistic title="日同比" value="6.15%" trend="down" />
                }
              />
            </StatisticCard>
            <StatisticCard
              statistic={{
                title: '当日排名',
                value: 6,
                description: (
                  <Statistic title="日同比" value="3.85%" trend="down" />
                ),
              }}
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                  alt="折线图"
                  width="100%"
                />
              }
            >
              <Statistic
                title="近7日收入"
                value={17458}
                layout="vertical"
                description={
                  <Statistic title="日同比" value="6.47%" trend="up" />
                }
              />
            </StatisticCard>
            <StatisticCard
              statistic={{
                title: '财年业绩收入排名',
                value: 2,
                description: (
                  <Statistic title="日同比" value="6.47%" trend="up" />
                ),
              }}
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                  alt="折线图"
                  width="100%"
                />
              }
            >
              <Statistic
                title="月付费个数"
                value={601}
                layout="vertical"
                description={
                  <Statistic title="日同比" value="6.47%" trend="down" />
                }
              />
            </StatisticCard>
          </StatisticCard.Group>
        </ProCard>
        </div>
      </RcResizeObserver>
    </PageContainer>
  );
};

export default Welcome;
