// @flow
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Input from 'components/Input';
import TableData from 'components/Table';
import { PrimaryButton } from 'components/Button';
import maintenanceHistory from '../../../mockData/maintenanceHistory';
import { headMaintenanceHistory } from '../../../constants/headerTable';

const MaintenanceHistory = () => {
  return (
    <div className="register-device__maintenance-history w-100">
      <Row>
        <Col xs={12}>
          <TableData
            tableHeads={headMaintenanceHistory}
            tableBody={maintenanceHistory}
          />
        </Col>
      </Row>
      <div className="form-update">
        <Input onChange={() => {}} className="input-update" />
        <PrimaryButton
          type="button"
          size="md"
          variant="secondary"
          onClick={() => {}}
        >
          등록
        </PrimaryButton>
      </div>
    </div>
  );
};

export default MaintenanceHistory;
