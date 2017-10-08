#ifndef UV_TRADER_H_
#define UV_TRADER_H_

#include "stdafx.h"
#include <iostream>
#include <string>
#include <map>
#include <fstream>
#include "ThostFtdcTraderApi.h"
#include "ThostFtdcUserApiDataType.h"
#include <uv.h>
#include <node.h>
#include "wraper_struct.h"

extern std::string to_string(int val);
extern bool islog;
void logger_cout(const char* content);

class uv_trader :public CThostFtdcTraderSpi {
public:
	uv_trader(void);
	virtual ~uv_trader(void);
	///ע���¼�
	int On(const char* eName,int cb_type, void(*callback)(CbRtnField* cbResult));
	///����ǰ�û�
	void  Connect(UVConnectField* pConnectField, void(*callback)(int, void*),int uuid);
	///�û���¼����
	void  ReqUserLogin(CThostFtdcReqUserLoginField *pReqUserLoginField, void(*callback)(int, void*),int uuid);
	///�ǳ����� 
	void  ReqUserLogout(CThostFtdcUserLogoutField *pUserLogout, void(*callback)(int, void*),int uuid);
	///Ͷ���߽�����ȷ��
	void  ReqSettlementInfoConfirm(CThostFtdcSettlementInfoConfirmField *pSettlementInfoConfirm, void(*callback)(int, void*),int uuid);
	///�����ѯ��Լ
	void ReqQryInstrument(CThostFtdcQryInstrumentField *pQryInstrument, void(*callback)(int, void*),int uuid);
	///�����ѯ�ʽ��˻�
	void ReqQryTradingAccount(CThostFtdcQryTradingAccountField *pQryTradingAccount, void(*callback)(int, void*),int uuid);
	///�����ѯͶ���ֲ߳�
	void ReqQryInvestorPosition(CThostFtdcQryInvestorPositionField *pQryInvestorPosition, void(*callback)(int, void*),int uuid);
	///�ֲ���ϸ
	void ReqQryInvestorPositionDetail(CThostFtdcQryInvestorPositionDetailField *pQryInvestorPositionDetail, void(*callback)(int, void*),int uuid);
	///����¼������
	void ReqOrderInsert(CThostFtdcInputOrderField *pInputOrder, void(*callback)(int, void*),int uuid);
	///������������
	void ReqOrderAction(CThostFtdcInputOrderActionField *pInputOrderAction, void(*callback)(int, void*),int uuid);
	///�����ѯ��Լ��֤����
	void ReqQryInstrumentMarginRate(CThostFtdcQryInstrumentMarginRateField *pQryInstrumentMarginRate, void(*callback)(int, void*),int uuid);
	///�����ѯ����
	void ReqQryDepthMarketData(CThostFtdcQryDepthMarketDataField *pQryDepthMarketData, void(*callback)(int, void*),int uuid);
	///�����ѯͶ���߽�����
	void ReqQrySettlementInfo(CThostFtdcQrySettlementInfoField *pQrySettlementInfo, void(*callback)(int, void*),int uuid);
    
    const char* GetTradingDay();
	//�����ʼ��
	//void Init(int args);
	///�Ͽ�
	void Disconnect();
	
private:
	///�첽���� queue
	static void _async(uv_work_t * work);
	///�첽������� queue
	static void _completed(uv_work_t * work, int);

    static void _on_async(uv_work_t * work);

    static void _on_completed(uv_work_t * work,int);
	///����ctp api
	void invoke(void* field, int ret, void(*callback)(int, void*), int uuid);

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
	virtual void  OnRspUserLogout(CThostFtdcUserLogoutField *pUserLogout, CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast);
	///Ͷ���߽�����ȷ����Ӧ 
	virtual void OnRspSettlementInfoConfirm(CThostFtdcSettlementInfoConfirmField *pSettlementInfoConfirm, CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast);
	///����¼��������Ӧ 
	virtual void OnRspOrderInsert(CThostFtdcInputOrderField *pInputOrder, CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast);
	///����¼�����ر� 
	virtual void OnErrRtnOrderInsert(CThostFtdcInputOrderField *pInputOrder, CThostFtdcRspInfoField *pRspInfo);
	///��������������Ӧ 
	virtual void OnRspOrderAction(CThostFtdcInputOrderActionField *pInputOrderAction, CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast);
	///������������ر� 
	virtual void OnErrRtnOrderAction(CThostFtdcOrderActionField *pOrderAction, CThostFtdcRspInfoField *pRspInfo);
	///�����ѯ������Ӧ 
	virtual void OnRspQryOrder(CThostFtdcOrderField *pOrder, CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast);
	///����֪ͨ 
	virtual void OnRtnOrder(CThostFtdcOrderField *pOrder);
	///�����ѯ�ɽ���Ӧ 
	virtual void OnRspQryTrade(CThostFtdcTradeField *pTrade, CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast);
	///�ɽ�֪ͨ 
	virtual void OnRtnTrade(CThostFtdcTradeField *pTrade);
	///�����ѯͶ���ֲ߳���Ӧ 
	virtual void OnRspQryInvestorPosition(CThostFtdcInvestorPositionField *pInvestorPosition, CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast);
	///�����ѯͶ���ֲ߳���ϸ��Ӧ 
	virtual void OnRspQryInvestorPositionDetail(CThostFtdcInvestorPositionDetailField *pInvestorPositionDetail, CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast);
	///�����ѯ�ʽ��˻���Ӧ 
	virtual void OnRspQryTradingAccount(CThostFtdcTradingAccountField *pTradingAccount, CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast);
	///�����ѯ��Լ��Ӧ 
	virtual void OnRspQryInstrument(CThostFtdcInstrumentField *pInstrument, CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast);
	///�����ѯ������Ӧ 
	virtual void OnRspQryDepthMarketData(CThostFtdcDepthMarketDataField *pDepthMarketData, CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast);
	///�����ѯͶ���߽�������Ӧ 
	virtual void OnRspQrySettlementInfo(CThostFtdcSettlementInfoField *pSettlementInfo, CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast);
	///����Ӧ�� 
	virtual void OnRspError(CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast);

	CThostFtdcTraderApi* m_pApi;//����API

	int iRequestID;
    uv_async_t async_t;
	static std::map<int, CbWrap*> cb_map;
};





#endif
