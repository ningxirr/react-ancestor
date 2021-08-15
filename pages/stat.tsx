import React from "react";
import { NextPage } from "next";
import { CatPost } from "./types/Cats";
import { Table, Row, Col, Button} from 'antd';
import {HomeOutlined } from '@ant-design/icons';

interface StatProps {
  posts: CatPost[];
}

  const count = 0;
  const Stat: NextPage<StatProps> = ({ posts }) => {
    
    const accData = posts.reduce(
      (prevAcc,{author}) => ({
        ...prevAcc,
        [author]: author in prevAcc ? prevAcc[author]+1 : 1,
      }),
      {}
    );

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: ' The number of images',
            dataIndex: 'number',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.number - b.number,
        },
    ];

    const data = Object.entries(accData).map(
      ([author,number], index) => ({
        key: index,
        name: author,
        number,
      })
    );

    function onChange(pagination, filters, sorter, extra) {
      console.log('params', pagination, filters, sorter, extra);
    }
    

    return (
      <div>
            <br /><br />
            <Table columns={columns} dataSource={data} />

            <Row justify="center">
                <Col >
                    <Button type="primary" href="/" size="large" shape="round" icon={<HomeOutlined />}> 
                      Back to Home Page
                    </Button>
                </Col>
            </Row>   
      </div>
    );
  }
  
Stat.getInitialProps = async ({req}):Promise<StatProps> => {
  let host = "";
  if (req!=undefined){
    const {
      headers: {host: hostHeader},
    } = req;
    host = hostHeader;
  }else {
    host = "localhost:3000";
  }
  const res = await fetch(`http://${host}/api/getCats`);
  return { posts: await res.json() };
};

export default Stat;