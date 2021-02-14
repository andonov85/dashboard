import RGL, { WidthProvider } from "react-grid-layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';

import SimpleLineChart from '../components/SimpleLineChart';
import StackedBarChart from '../components/StackedBarChart';

import Notifications from './Notifications';
import BestSeller from './BestSeller';

import SimpleItem from '../styled-components/composite/SimpleItem';
import { Box } from '../styled-components/Layout';
import { Title } from '../styled-components/Typography';

const ReactGridLayout = WidthProvider(RGL);
const layout = [
    { i: 'a', x: 5, y: 0, w: 4, h: 3 },
    { i: 'b', x: 9, y: 0, w: 4, h: 3 },
    { i: 'c', x: 13, y: 0, w: 4, h: 3 },
    { i: 'd', x: 5, y: 4, w: 12, h: 9 },
    { i: 'e', x: 5, y: 8, w: 12, h: 9 },
    { i: 'f', x: 17, y: 4, w: 8, h: 18 },
    { i: 'g', x: 25, y: 4, w: 6, h: 10 }
];

function Dashboard() {
    return (
        <div className="dashboard">
            <ReactGridLayout
                className=""
                layout={layout}
                cols={36} rowHeight={30} width={1200}
            >
                <div key="a">
                    <Box padding="0">
                        <SimpleItem
                            title="Total Stocks"
                            text="112.000"
                            icon={<FontAwesomeIcon icon={faBoxOpen}></FontAwesomeIcon>}
                            iconColor="#be4bdb"
                        />
                    </Box>
                </div>
                <div key="b">
                    <Box padding="0">
                        <SimpleItem
                            title="New Orders" 
                            text="4.310"
                            icon={<FontAwesomeIcon icon={faClipboardList}></FontAwesomeIcon>}
                            iconColor="#f783ac"
                        />
                    </Box>
                </div>
                <div key="c">
                    <Box padding="0">
                        <SimpleItem
                            title="Paid Orders"
                            text="9.702"
                            icon={<FontAwesomeIcon icon={faShoppingBag}></FontAwesomeIcon>}
                            iconColor="#82c91e"
                        />
                    </Box>
                </div>
                <div key="d">
                    <Box>
                        <Title>Sales by Month</Title>
                        <SimpleLineChart />
                    </Box>
                </div>
                <div key="e">
                    <Box>
                        <Title>Product Impressions</Title>
                        <StackedBarChart />
                    </Box>
                </div>
                <div key="f">
                    <Notifications />
                </div>
                <div key="g">
                    <BestSeller />
                </div>
            </ReactGridLayout>
        </div>
    );
}

export default Dashboard;