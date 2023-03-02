import Layout from "../../Components/Layout/Layout";
import { getSession } from "next-auth/react";
import { getAllContentEndpoint, getCategories, getSectionByCategory } from "../../http";
import { IConfigData, ISessionData } from "../_app";
import { NextPage, NextPageContext } from "next";
import { useEffect, useState } from "react";
import { IAllContentResponse } from "..";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";


const loadingData = new Array(20).fill(1)

interface ICategoryPageProps {
    config: IConfigData;
    userSession: ISessionData;
    query: {
        catagories: string;
    }
}

const CategoryPage: NextPage<ICategoryPageProps> = ({ config, userSession, query }): JSX.Element => {
    // console.log(query.catagories)
    const router = useRouter();
    const [categoryData, setCategoryData] = useState<IAllContentResponse['data']>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [category, setCategory] = useState<any>();
    const [data, setData] = useState<IAllContentResponse['data']>([]);


    // generate href for slider
    const generateUrl = (item: any) => {
        const type = item.type.toLowerCase();
        const slug = item.slug;
        const url = `/${type}/${slug}`;
        return url;
    }

    // handleSliderClick
    const handleSliderClick = (item: any, reload?: boolean) => {
        const url = generateUrl(item);
        if (reload) {
            router.push(url).then(() => router.reload())
        } else {
            router.replace(url)
        }
    }

    const getDataByCategory = async (category: string, page: number) => {

        try {
            const { data, status } = await getAllContentEndpoint(`page=${page}&limit=25&sort=desc&category_id=${category}`);
            if (status === 200) {
                // copy all data 
                setCategoryData([...categoryData, ...data.data])
                setLoading(false);
            }
        } catch (error) {
            setCategoryData([]);
            setLoading(false);
        }
    }

    const getDataByCategoryQuery = async (category: string, page: number) => {

        try {
            const { data, status } = await getAllContentEndpoint(`page=${page}&limit=25&sort=desc&category_id=${category}`);
            if (status === 200) {
                // copy all data 
                setCategoryData(data.data)
                setLoading(false);
            }
        } catch (error) {
            setCategoryData([]);
            setLoading(false);
        }
    }

    const getCategoriesFunc = async () => {
        try {
            const { data, status } = await getSectionByCategory(`${query.catagories}`);
            if (status === 200) {
                // console.log(data.data)
                setCategory(data.data);
                setData(data.data.content);

            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getDataByCategory(query.catagories, page);
        getCategoriesFunc();
        return () => {
            setCategoryData([]);
            setPage(1);
            setCategory(undefined);
        }
    }, []);

    useEffect(() => {
        getDataByCategoryQuery(query.catagories, 1);
        getCategoriesFunc();
        return () => {
            setCategoryData([]);
            setPage(1);
            setCategory(undefined);
        }
    }, [query]);

    // get more data
    const getMoreData = async () => {
        setPage(page + 1)
        getDataByCategory(query.catagories, page);
    }

    return (
        <Layout
            userSession={userSession}
            config={config.data || false}
        >
            <div className="container px-10 mt-10">
                <div className="text-2xl text-white font-semibold">
                    {
                        category && category.title
                    }
                </div>
                <p className="mt-2 text-sm">
                    {
                        category && category.description
                    }
                </p>
            </div>

                <div className="container m-auto mt-4">
                    <div className='grid grid-cols-2 lg:grid-cols-5 gap-3 mx-5 lg:mx-0'>

                        {
                            loading ? loadingData.map((item, index) => {
                                return (
                                    <div key={index} className='col-span-1'>
                                        <div className='relative'>
                                            <div className='aspect-video mx-auto w-[100%] my-auto rounded cursor-pointer bg-gray-600'>

                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : data && data.length > 0 && data.map((item: any, index: any) => {
                                return (
                                    <div key={index} className='col-span-1'>
                                        <div className='hover:scale-110 duration-500'>
                                            <img
                                                onClick={() => handleSliderClick(item)}
                                                src={item.thumbnail}
                                                className='aspect-video mx-auto w-[100%] my-auto rounded cursor-pointer bg-gray-600'
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
        </Layout>
    )
};

export default CategoryPage;


export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    const query = context.query;
    console.log(query)
    if (!session) {
        return {
            props: {
                userSession: null,
                query: query
            },
        };
    } else {
        return {
            props: {
                userSession: session,
                query: query
            },
        };
    }
}


