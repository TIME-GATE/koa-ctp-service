#ifndef N_TRADER_H_
#define N_TRADER_H_

#include "stdafx.h"
#include <iostream>
#include <string>
#include <sstream>
#include <map>
#include <fstream>
#include <node.h>
#include "ThostFtdcTraderApi.h"
#include "ThostFtdcUserApiDataType.h"
#include <uv.h>
#include "uv_trader.h"

using namespace v8;

extern bool islog;
extern void logger_cout(const char* content);
extern std::string to_string(int val);
extern std::string charto_string(char val);

class WrapTrader : public node::ObjectWrap {
public:
	WrapTrader(void);
	~WrapTrader(void);

	///����ǰ�û�
	static Handle<Value> Connect(const Arguments& args);	
	///ע���¼�
	static Handle<Value> On(const Arguments& args);
	///�û���¼����
	static Handle<Value> ReqUserLogin(const Arguments& args);
	///�ǳ����� 
	static Handle<Value> ReqUserLogout(const Arguments& args);
	///Ͷ���߽�����ȷ��
	static Handle<Value> ReqSettlementInfoConfirm(const Arguments& args);
	///�����ѯ��Լ
	static Handle<Value> ReqQryInstrument(const Arguments& args);
	///�����ѯ�ʽ��˻�
	static Handle<Value> ReqQryTradingAccount(const Arguments& args);
	///�����ѯͶ���ֲ߳�
	static Handle<Value> ReqQryInvestorPosition(const Arguments& args);
	///�ֲ���ϸ
	static Handle<Value> ReqQryInvestorPositionDetail(const Arguments& args);
	///����¼������
	static Handle<Value> ReqOrderInsert(const Arguments& args);
	///������������
	static Handle<Value> ReqOrderAction(const Arguments& args);
	///�����ѯ��Լ��֤���� 
	static Handle<Value> ReqQryInstrumentMarginRate(const Arguments& args);
	///�����ѯ���� 
	static Handle<Value> ReqQryDepthMarketData(const Arguments& args);
	///�����ѯͶ���߽����� 
	static Handle<Value> ReqQrySettlementInfo(const Arguments& args);
	///ɾ���ӿڶ���
	static Handle<Value> Disposed(const Arguments& args);
	//�����ʼ��
	static void Init(int args);
	static Handle<Value> NewInstance(const Arguments& args);
    static Handle<Value> GetTradingDay(const Arguments& args);

private:
	static void initEventMap();	
	static Handle<Value> New(const Arguments& args);
	static void pkg_cb_userlogin(CbRtnField* data, Local<Value>*cbArray);
	static void pkg_cb_userlogout(CbRtnField* data, Local<Value>*cbArray);
	static void pkg_cb_confirm(CbRtnField* data, Local<Value>*cbArray);
	static void pkg_cb_orderinsert(CbRtnField* data, Local<Value>*cbArray);
	static void pkg_cb_errorderinsert(CbRtnField* data, Local<Value>*cbArray);
	static void pkg_cb_orderaction(CbRtnField* data, Local<Value>*cbArray);
	static void pkg_cb_errorderaction(CbRtnField* data, Local<Value>*cbArray);
	static void pkg_cb_rspqryorder(CbRtnField* data, Local<Value>*cbArray);
	static void pkg_cb_rtnorder(CbRtnField* data, Local<Value>*cbArray);
	static void pkg_cb_rqtrade(CbRtnField* data, Local<Value>*cbArray);
	static void pkg_cb_rtntrade(CbRtnField* data, Local<Value>*cbArray);
	static void pkg_cb_rqinvestorposition(CbRtnField* data, Local<Value>*cbArray);
	static void pkg_cb_rqinvestorpositiondetail(CbRtnField* data, Local<Value>*cbArray);
	static void pkg_cb_rqtradingaccount(CbRtnField* data, Local<Value>*cbArray);
	static void pkg_cb_rqinstrument(CbRtnField* data, Local<Value>*cbArray);
	static void pkg_cb_rqdepthmarketdata(CbRtnField* data, Local<Value>*cbArray);
	static void pkg_cb_rqsettlementinfo(CbRtnField* data, Local<Value>*cbArray);
	static void pkg_cb_rsperror(CbRtnField* data, Local<Value>*cbArray);

	static Local<Value> pkg_rspinfo(void *vpRspInfo);
	uv_trader* uvTrader;
	static int s_uuid;
	static void FunCallback(CbRtnField *data);
	static void FunRtnCallback(int result, void* baton);
	static Persistent<Function> constructor;
	static std::map<const char*, int,ptrCmp> event_map;
	static std::map<int, Persistent<Function> > callback_map;
	static std::map<int, Persistent<Function> > fun_rtncb_map; 	
};



#endif
