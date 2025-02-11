import { Body, Container, Head, Hr, Html, Img, Link, Preview, Section, Text } from '@react-email/components';
import type { DailyInsightSchema, HoroscopeResultsSchema } from '~/validations/horoscopeResults.validation';
import { mainGray } from '../theme/theme.utils';

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';

export default function DailyHoroscopeEmail({
    name,
    dailyHoroscope
}: {
    name: string;
    dailyHoroscope: HoroscopeResultsSchema;
}) {
    return (
        <Html>
            <Head />
            <Preview>
                Daily Horoscope for {dailyHoroscope.sign} on {dailyHoroscope.date}
            </Preview>
            <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', color: mainGray }}>
                <Container style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
                    <Section style={logo}>
                        <Img width={48} src={`${baseUrl}/horoscope-icon.png`} />
                    </Section>
                    <Section>
                        <Text style={text}>Hey {name},</Text>
                    </Section>
                    <Section>
                        <Text style={text}>
                            Your horoscope for <b>{dailyHoroscope.sign}</b> on <b>{dailyHoroscope.date}</b>:
                        </Text>
                    </Section>
                    <Section>
                        <Text style={text}>
                            <ul>
                                {dailyHoroscope.horoscopes.map((item, index) => (
                                    <li key={index} style={listItemStyle}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </Text>
                    </Section>

                    <Section>
                        <Text style={subTitle}>Affirmations</Text>
                        <ul>
                            {dailyHoroscope.affirmations.map((affirmation, index) => (
                                <li key={index} style={listItemStyle}>
                                    {affirmation}
                                </li>
                            ))}
                        </ul>
                    </Section>
                    <Section>
                        <Text style={subTitle}>Daily Insights</Text>
                        <DailyInsightsTable dailyInsights={dailyHoroscope.dailyInsights} />
                    </Section>

                    <Section style={{ marginTop: '30px' }}>
                        <Hr style={divider} />
                        <Text style={footerText}>
                            Created by <Link href="https://trimatech.dev">Trimatech</Link>
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

const logo = {
    display: 'flex',
    padding: '20px 30px',
    justifyContent: 'center'
} as const;

const subTitle = {
    fontSize: '18px',
    fontWeight: 'bold'
} as const;

const text = {
    fontSize: '16px',
    lineHeight: '1.5'
} as const;

const footerText = {
    fontSize: '12px',
    color: '#6C6969',
    textAlign: 'right'
} as const;

const divider = {};

const listItemStyle = {
    padding: '10px 0'
} as const;

const DailyInsightsTable = ({ dailyInsights }: { dailyInsights: DailyInsightSchema[] }) => {
    const tableStyle = {
        maxWidth: '550px',
        borderCollapse: 'collapse',
        marginTop: '10px'
    } as const;

    const cellStyle = {
        border: '1px dashed #ccc',
        padding: '20px 14px',
        textAlign: 'center'
    } as const;

    const insightNameStyle = {
        fontSize: '14px',
        fontWeight: 'lighter',
        paddingBottom: '15px'
    };

    const insightValueStyle = {
        fontSize: '14px',
        fontWeight: 'bold'
    };

    return (
        <table style={tableStyle}>
            <tbody>
                {Array.from({ length: Math.ceil(dailyInsights.length / 3) }).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        {[0, 1, 2].map((colIndex) => {
                            const insight = dailyInsights[rowIndex * 3 + colIndex];
                            return (
                                <td key={colIndex} style={cellStyle}>
                                    {insight && (
                                        <>
                                            <div style={insightNameStyle}>{insight.name}</div>
                                            <div style={insightValueStyle}>{insight.value}</div>
                                        </>
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
