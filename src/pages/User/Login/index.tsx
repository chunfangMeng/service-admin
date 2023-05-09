import {
  CodeOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, history, useIntl, useModel, Helmet, useRequest } from '@umijs/max';
import { Image, message, Space } from 'antd';
import Settings from '../../../../config/defaultSettings';
import React, { useRef } from 'react';
import { flushSync } from 'react-dom';
import { getCaptchaCode } from '@/services/user/api';
import { login } from '@/services/user/login';


const Login: React.FC = () => {
  const loginRef = useRef<ProFormInstance>();
  // const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const { initialState, setInitialState } = useModel('@@initialState');

  const captcha = useRequest(() => {
    return getCaptchaCode()
  }, {
    onSuccess: res => {
      loginRef.current?.setFieldsValue({'hash_key': res.hash_key})
    }
  })

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: ManagerUser.LoginParams) => {
    try {
      // 登录
      const loginRes = await login({ ...values });
      
      if (loginRes.code === 200 && !Array.isArray(loginRes.data)) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        localStorage.setItem('token', loginRes.data.token)
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      // 如果失败去设置用户错误信息
      // setUserLoginState({msg: loginRes.message});
    } catch (error) {
      // const defaultLoginFailureMessage = intl.formatMessage({
      //   id: 'pages.login.failure',
      //   defaultMessage: '登录失败，请重试！',
      // });
      // console.log(error);
      // message.error(defaultLoginFailureMessage);
    }
  };
  // const { status, type: loginType } = userLoginState;

  return (
    <div className='flex flex-col h-screen overflow-auto bg-[length:100%_100%] bg-[url("https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr")]'>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: '登录页',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          formRef={loginRef}
          className='mt-10'
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          title="ServiceAdmin"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as ManagerUser.LoginParams);
          }}
        >
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: '请输入用户名',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: '密码: ant.design',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
            <ProFormText
              hidden
              name={"hash_key"}/>
            <Space
              size="middle"
              align="center">
              <ProFormText
                name="check_code"
                fieldProps={{
                  size: 'large',
                  prefix: <CodeOutlined />,
                  maxLength: 4
                }}
                colProps={{
                  span: 14,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.captcha.placeholder',
                  defaultMessage: '请输入验证码',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.captcha.required"
                        defaultMessage="请输入验证码!"
                      />
                    ),
                  },
                ]}
              />
              <Image
                className='h-10 max-h-10 mb-6'
                preview={false}
                onClick={() => captcha.run()}
                src={typeof captcha.data === "undefined" ? undefined : `data:image/png;base64, ${captcha.data?.base64_image}`}/>
            </Space>
          </>

          {/* {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />} */}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
            </a>
          </div>
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
