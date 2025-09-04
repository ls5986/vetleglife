import { NextResponse } from 'next/server';
import { IUL_QUOTE_CONFIG, STATE_CODE_TO_NAME } from '@/config/settings';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      issueStateCode = 'AL',
      IssueState,
      insuredAge: bodyInsuredAge,
      InsuredAge,
      insuredGender: bodyInsuredGender,
      Insured_Gender,
      smoker: bodySmoker,
      IsInsuredSmoker,
      faceAmount: bodyFaceAmount,
      FaceAmount,
      premium = 0,
      productId = IUL_QUOTE_CONFIG.productId,
    } = body || {};

    const issueState = (IssueState as string) || STATE_CODE_TO_NAME[issueStateCode] || issueStateCode;
    const insuredAge = Number(InsuredAge ?? bodyInsuredAge ?? 65);
    const insuredGender = String(Insured_Gender ?? bodyInsuredGender ?? 'Male');
    const smoker = String(IsInsuredSmoker ?? bodySmoker ?? 'No');
    const faceAmount = Number(FaceAmount ?? bodyFaceAmount ?? 50000);

    // If you have a proxy-able URL and headers JSON in env, use it; otherwise, return a mocked 200 with minimal fields
    const url = IUL_QUOTE_CONFIG.americoQuoteUrl;
    const headersJson = IUL_QUOTE_CONFIG.americoHeadersJson;

    const payload = {
      ProductSelection: String(productId),
      IULQuoteAsOfDate: new Date().toLocaleDateString('en-US'),
      IssueState: issueState,
      AgeMode: 'Age',
      InsuredAge: insuredAge,
      Insured_Gender: insuredGender,
      IsInsuredSmoker: smoker,
      SolveForMode: 'Premium',
      FaceAmount: faceAmount,
      Premium: Number(premium),
      PaymentMode: 'Monthly Bank Draft',
      SolveOption: 'Basic Solve',
      SolveOptionFaceAmount: 'Basic Solve',
      PP_DeathBenefitOption: 'OptionALevel',
      MonthlyBenefit: 250,
      Withdrawal: 'None',
      WithdrawalType: 'Penalty Free',
      WithdrawalAmountPercent: 10,
      WithdrawalAmountCurrency: 500,
      FromYear: 2,
      ToYear: 2,
      JointAnnuitant: 'No',
      AnnuitantAgeMode: 'Age',
      AnnuitantAge: 27,
      AnnuitantGender: 'Male',
      fundAllocations: [
        { allocation: 100, productCode: '01' },
        { allocation: 0, productCode: '02' },
      ],
    };

    if (!url || !headersJson) {
      // Fallback mock for local dev without sensitive headers
      const mock = {
        FaceAmount: Number(faceAmount),
        TotalMonthlyPremium: 158.15,
        TargetPremium: 158.15,
        NonGtdNumericSummaryEOYSurrValueArray: [3305, 10102, 22858],
        NonGtdNumericSummaryEOYDBArray: [faceAmount, faceAmount, faceAmount],
      };
      return NextResponse.json({ success: true, data: mock, mocked: true });
    }

    const headers: Record<string, string> = JSON.parse(headersJson);
    headers['content-type'] = 'application/json';

    const resp = await fetch(`${url}?productId=${productId}&isReproposal=false`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const data = await resp.json();
    if (!resp.ok) {
      return NextResponse.json({ success: false, error: data?.message || 'Quote API failed' }, { status: resp.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}


