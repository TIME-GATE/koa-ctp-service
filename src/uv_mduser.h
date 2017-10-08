#ifndef _UV_MDUSER_
#define _UV_MDUSER_

#include "stdafx.h"
#include <iostream>
#include <string>
#include <map>
#include <fstream>
#include "ThostFtdcMdApi.h"
#include "ThostFtdcUserApiDataType.h"
#include <uv.h>
#include <node.h>
#include "wraper_struct.h"

extern void logger_cout(const char* content);
extern std::string to_string(int val);

class uv_mduser :public CThostFtdcMdSpi {
public:
	uv_mduser(void);
	~uv_mduser(void);

	///ע���¼�
	int On(const char* eName, int cb_type, void(*callback)(CbRtnField* cbResult));
	///����ǰ�û�
	void  Connect(UVConnectField* pConnectField, void(*callback)(int, void*), int uuid);
	void  ReqUserLogin(CThostFtdcReqUserLoginField *pReqUserLoginField, void(*callback)(int, void*), int uuid);
	void  ReqUserLogout(CThostFtdcUserLogoutField *pUserLogout, void(*callback)(int, void*), int uuid);
	void  SubscribeMarketData(char *ppInstrumentID[], int nCount, void(*callback)(int, void*), int uuid);
	void  UnSubscribeMarketData(char *ppInstrumentID[], int nCount, void(*callback)(int, void*), int uuid);
	void  Disposed(); 	

private:
	///�첽���� queue
	static void _async(uv_work_t * work);
	///�첽������� queue
	static void _completed(uv_work_t * work, int);

    static void _on_async(uv_work_t * work);

    static void _on_completed(uv_work_t * work,int);
	///����ctp api
	void invoke(void* field, int count, int ret, void(*callback)(int, void*), int uuid);

	void on_invoke(int event_type, void* _stru, CThostFtdcRspInfoField *pRspInfo_org, int nRequestID, bool bIsLast);
	///���ͻ����뽻�׺�̨������ͨ������ʱ����δ��¼ǰ�����÷���������
	virtual void OnFrontConnected();
	///���ӶϿ�ʱ���÷���������
	///@param nReason ����ԭ��
	///        0x1001 �����ʧ��
	///        0x1002 ����дʧ��
	///        0x2001 ����������ʱ
	///        0x2002 ��������ʧ��
	///        0x2003 �յ�������
	virtual void OnFrontDisconnected(int nReason);
	///��¼������Ӧ 
	virtual void OnRspUserLogin(CThostFtdcRspUserLoginField *pRspUserLogin, CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast);
	///�ǳ�������Ӧ 
	virtual void OnRspUserLogout(CThostFtdcUserLogoutField *pUserLogout, CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast);
	///����Ӧ�� 
	virtual void OnRspError(CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast);
	///��������Ӧ�� 
	virtual void OnRspSubMarketData(CThostFtdcSpecificInstrumentField *pSpecificInstrument, CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast);
	///ȡ����������Ӧ�� 
	virtual void OnRspUnSubMarketData(CThostFtdcSpecificInstrumentField *pSpecificInstrument, CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast);
	///�������֪ͨ 
	virtual void OnRtnDepthMarketData(CThostFtdcDepthMarketDataField *pDepthMarketData);

	CThostFtdcMdApi* m_pApi;
	int iRequestID;
    uv_async_t async_t;
	static std::map<int, CbWrap*> cb_map;
};



#endif
