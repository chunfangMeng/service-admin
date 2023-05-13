import { ModalForm, ProFormUploadDragger } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button } from 'antd';
import React from 'react';


type BatchUploadProps = {
  open: boolean;
  csrftoken: string | undefined;
  onOpenChange: (visible: boolean) => void;
}
const BatchUpload: React.FC<BatchUploadProps> = (props) => {
  const intl = useIntl();
  return (
    <ModalForm
      {...props}
      title={intl.formatMessage({id: 'pages.batch.upload'})}>
      <div className='flex items-center mb-3'>
        <label>Excel模版:</label>
        <Button className='ml-4'>下载</Button>
      </div>
      <ProFormUploadDragger
        accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
        max={1}
        action="/api/v1/stock/management/brand/upload/"
        fieldProps={{
          maxCount: 1,
          headers: {
            'X-CSRFToken': props.csrftoken as string
          }
        }} />
    </ModalForm>
  )
}

export default BatchUpload;