<<<<<<< HEAD
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMinus from '../Icon/IconMinus';
import IconMenuChat from '../Icon/Menu/IconMenuChat';
import IconMenuMailbox from '../Icon/Menu/IconMenuMailbox';
import IconMenuTodo from '../Icon/Menu/IconMenuTodo';
import IconMenuNotes from '../Icon/Menu/IconMenuNotes';
import IconMenuScrumboard from '../Icon/Menu/IconMenuScrumboard';
import IconMenuContacts from '../Icon/Menu/IconMenuContacts';
import IconMenuInvoice from '../Icon/Menu/IconMenuInvoice';
import IconMenuCalendar from '../Icon/Menu/IconMenuCalendar';
import IconMenuComponents from '../Icon/Menu/IconMenuComponents';
import IconMenuElements from '../Icon/Menu/IconMenuElements';
import IconMenuCharts from '../Icon/Menu/IconMenuCharts';
import IconMenuWidgets from '../Icon/Menu/IconMenuWidgets';
import IconMenuFontIcons from '../Icon/Menu/IconMenuFontIcons';
import IconMenuDragAndDrop from '../Icon/Menu/IconMenuDragAndDrop';
import IconMenuTables from '../Icon/Menu/IconMenuTables';
import IconMenuDatatables from '../Icon/Menu/IconMenuDatatables';
import IconMenuForms from '../Icon/Menu/IconMenuForms';
import IconMenuUsers from '../Icon/Menu/IconMenuUsers';
import IconMenuPages from '../Icon/Menu/IconMenuPages';
import IconMenuAuthentication from '../Icon/Menu/IconMenuAuthentication';
import IconMenuDocumentation from '../Icon/Menu/IconMenuDocumentation';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-[#055662] dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            <img className="w-8 ml-[5px] flex-none" src="/assets/FintImg/logo/fint-logo.png" alt="logo" />
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 align-middle lg:inline text-white font-bold dark:text-white-light">{t('FINT')}</span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90 text-white" />
                        </button>
                    </div>
                    <div className="py-4">
                        <img className="h-[7rem] w-[7rem] m-auto rounded-3xl" src="/assets/FintImg/person/admin.jpg" alt="" />
                    </div>
                    <div className="text-white text-center">
                        Welcome Back, <br />
                        <span className="font-bold text-xl">Karthik Subramanian</span>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            {/* <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                    <div className="flex items-center">
                                        <IconMenuDashboard className="group-hover:!text-primary shrink-0 !text-white" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('dashboard')}</span>
                                    </div>

                                    <div className={currentMenu !== 'dashboard' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/">{t('sales')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/analytics">{t('analytics')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/finance">{t('finance')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/crypto">{t('crypto')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li> */}

                            {/* <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('apps')}</span>
                            </h2> */}

                            <li className="nav-item mt-4">
                                <ul>
                                    <li className="nav-item">
                                        <NavLink to="/" className="group">
                                            <div className="flex items-center">
                                                <IconMenuChat className="group-hover:!text-primary shrink-0 !text-white " />
                                                <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('dashboard')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/payment" className="group">
                                            <div className="flex items-center">
                                                <IconMenuMailbox className="group-hover:!text-primary shrink-0 !text-white" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('Payment')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/e-change" className="group">
                                            <div className="flex items-center">
                                                <IconMenuTodo className="group-hover:!text-primary shrink-0 !text-white" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('E-Change')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/coupons" className="group">
                                            <div className="flex items-center">
                                                <IconMenuNotes className="group-hover:!text-primary shrink-0 !text-white" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('Coupons')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/ads" className="group">
                                            <div className="flex items-center">
                                                <IconMenuScrumboard className="group-hover:!text-primary shrink-0 !text-white" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('Ads')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/pet-applications" className="group">
                                            <div className="flex items-center">
                                                <IconMenuContacts className="group-hover:!text-primary shrink-0 !text-white" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('Pet Applications')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/red-drop" className="group">
                                            <div className="flex items-center">
                                                <IconMenuContacts className="group-hover:!text-primary shrink-0 !text-white" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('Red Drop')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/users-list" className="group">
                                            <div className="flex items-center">
                                                <IconMenuContacts className="group-hover:!text-primary shrink-0 !text-white" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('Users List')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/expense-tracker" className="group">
                                            <div className="flex items-center">
                                                <IconMenuContacts className="group-hover:!text-primary shrink-0 !text-white" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('Expense Tracker')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/settings" className="group">
                                            <div className="flex items-center">
                                                <IconMenuContacts className="group-hover:!text-primary shrink-0 !text-white" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('Settings')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/settings" className="group">
                                            <div className="flex items-center">
                                                <IconMenuContacts className="group-hover:!text-primary shrink-0 !text-white" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('Settings')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/settings" className="group">
                                            <div className="flex items-center">
                                                <IconMenuContacts className="group-hover:!text-primary shrink-0 !text-white" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('Settings')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    {/* 
                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'invoice' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('invoice')}>
                                            <div className="flex items-center">
                                                <IconMenuInvoice className="group-hover:!text-primary shrink-0 !text-white" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('Red Drop')}</span>
                                            </div>

                                            <div className={currentMenu !== 'invoice' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'invoice' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500 ">
                                                <li>
                                                    <NavLink to="/apps/invoice/list">{t('list')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/preview">{t('preview')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/add">{t('add')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/edit">{t('edit')}</NavLink>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li> */}

                                    {/* <li className="nav-item">
                                        <NavLink to="/apps/calendar" className="group">
                                            <div className="flex items-center">
                                                <IconMenuCalendar className="group-hover:!text-primary shrink-0 !text-white" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('calendar')}</span>
                                            </div>
                                        </NavLink>
                                    </li> */}
                                    <button>Logout</button>
                                </ul>
                            </li>

                            {/* <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('user_interface')}</span>
                            </h2> */}

                            {/* <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'component' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('component')}>
                                    <div className="flex items-center">
                                        <IconMenuComponents className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('components')}</span>
                                    </div>

                                    <div className={currentMenu !== 'component' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                            {/* <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'component' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('component')}>
                                    <div className="flex items-center">
                                        <IconMenuComponents className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('components')}</span>
                                    </div>

                                    <div className={currentMenu !== 'component' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'component' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/components/tabs">{t('tabs')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/accordions">{t('accordions')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/modals">{t('modals')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/cards">{t('cards')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/carousel">{t('carousel')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/countdown">{t('countdown')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/counter">{t('counter')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/sweetalert">{t('sweet_alerts')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/timeline">{t('timeline')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/notifications">{t('notifications')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/media-object">{t('media_object')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/list-group">{t('list_group')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/pricing-table">{t('pricing_tables')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/lightbox">{t('lightbox')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'element' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('element')}>
                                    <div className="flex items-center">
                                        <IconMenuElements className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('elements')}</span>
                                    </div>

                                    <div className={currentMenu !== 'element' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'element' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/elements/alerts">{t('alerts')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/avatar">{t('avatar')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/badges">{t('badges')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/breadcrumbs">{t('breadcrumbs')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/buttons">{t('buttons')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/buttons-group">{t('button_groups')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/color-library">{t('color_library')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/dropdown">{t('dropdown')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/infobox">{t('infobox')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/jumbotron">{t('jumbotron')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/loader">{t('loader')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/pagination">{t('pagination')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/popovers">{t('popovers')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/progress-bar">{t('progress_bar')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/search">{t('search')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/tooltips">{t('tooltips')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/treeview">{t('treeview')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/typography">{t('typography')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <NavLink to="/charts" className="group">
                                    <div className="flex items-center">
                                        <IconMenuCharts className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('charts')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="menu nav-item">
                                <NavLink to="/widgets" className="group">
                                    <div className="flex items-center">
                                        <IconMenuWidgets className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('widgets')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="menu nav-item">
                                <NavLink to="/font-icons" className="group">
                                    <div className="flex items-center">
                                        <IconMenuFontIcons className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('font_icons')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="menu nav-item">
                                <NavLink to="/dragndrop" className="group">
                                    <div className="flex items-center">
                                        <IconMenuDragAndDrop className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('drag_and_drop')}</span>
                                    </div>
                                </NavLink>
                            </li> */}

                            {/* <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('tables_and_forms')}</span>
                            </h2> */}

                            {/* <li className="menu nav-item">
                                <NavLink to="/tables" className="group">
                                    <div className="flex items-center">
                                        <IconMenuTables className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('tables')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'datalabel' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('datalabel')}>
                                    <div className="flex items-center">
                                        <IconMenuDatatables className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('datatables')}</span>
                                    </div>

                                    <div className={currentMenu !== 'datalabel' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'datalabel' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/datatables/basic">{t('basic')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/advanced">{t('advanced')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/skin">{t('skin')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/order-sorting">{t('order_sorting')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/multi-column">{t('multi_column')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/multiple-tables">{t('multiple_tables')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/alt-pagination">{t('alt_pagination')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/checkbox">{t('checkbox')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/range-search">{t('range_search')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/export">{t('export')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/column-chooser">{t('column_chooser')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'forms' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('forms')}>
                                    <div className="flex items-center">
                                        <IconMenuForms className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('forms')}</span>
                                    </div>

                                    <div className={currentMenu !== 'forms' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'forms' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/forms/basic">{t('basic')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/input-group">{t('input_group')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/layouts">{t('layouts')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/validation">{t('validation')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/input-mask">{t('input_mask')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/select2">{t('select2')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/touchspin">{t('touchspin')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/checkbox-radio">{t('checkbox_and_radio')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/switches">{t('switches')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/wizards">{t('wizards')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/file-upload">{t('file_upload')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/quill-editor">{t('quill_editor')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/markdown-editor">{t('markdown_editor')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/date-picker">{t('date_and_range_picker')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/clipboard">{t('clipboard')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li> */}
                            {/* 
                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('user_and_pages')}</span>
                            </h2> */}

                            {/* <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'users' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('users')}>
                                    <div className="flex items-center">
                                        <IconMenuUsers className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('users')}</span>
                                    </div>

                                    <div className={currentMenu !== 'users' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'users' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/users/profile">{t('profile')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/users/user-account-settings">{t('account_settings')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'page' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('page')}>
                                    <div className="flex items-center">
                                        <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('pages')}</span>
                                    </div>

                                    <div className={currentMenu !== 'page' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'page' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/pages/knowledge-base">{t('knowledge_base')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/pages/contact-us-boxed" target="_blank">
                                                {t('contact_us_boxed')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/pages/contact-us-cover" target="_blank">
                                                {t('contact_us_cover')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/pages/faq">{t('faq')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/pages/coming-soon-boxed" target="_blank">
                                                {t('coming_soon_boxed')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/pages/coming-soon-cover" target="_blank">
                                                {t('coming_soon_cover')}
                                            </NavLink>
                                        </li>
                                        <li className="menu nav-item">
                                            <button
                                                type="button"
                                                className={`${
                                                    errorSubMenu ? 'open' : ''
                                                } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                onClick={() => setErrorSubMenu(!errorSubMenu)}
                                            >
                                                {t('error')}
                                                <div className={`${errorSubMenu ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretsDown fill={true} className="w-4 h-4" />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={errorSubMenu ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <a href="/pages/error404" target="_blank">
                                                            {t('404')}
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/pages/error500" target="_blank">
                                                            {t('500')}
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/pages/error503" target="_blank">
                                                            {t('503')}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        <li>
                                            <NavLink to="/pages/maintenence" target="_blank">
                                                {t('maintenence')}
                                            </NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'auth' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('auth')}>
                                    <div className="flex items-center">
                                        <IconMenuAuthentication className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('authentication')}</span>
                                    </div>

                                    <div className={currentMenu !== 'auth' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'auth' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/auth/boxed-signin" target="_blank">
                                                {t('login_boxed')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/auth/boxed-signup" target="_blank">
                                                {t('register_boxed')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/auth/boxed-lockscreen" target="_blank">
                                                {t('unlock_boxed')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/auth/boxed-password-reset" target="_blank">
                                                {t('recover_id_boxed')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/auth/cover-login" target="_blank">
                                                {t('login_cover')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/auth/cover-register" target="_blank">
                                                {t('register_cover')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/auth/cover-lockscreen" target="_blank">
                                                {t('unlock_cover')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/auth/cover-password-reset" target="_blank">
                                                {t('recover_id_cover')}
                                            </NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li> */}

                            {/* <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('supports')}</span>
                            </h2> */}

                            {/* <li className="menu nav-item">
                                <NavLink to="https://vristo.sbthemes.com" target="_blank" className="nav-link group">
                                    <div className="flex items-center">
                                        <IconMenuDocumentation className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('documentation')}</span>
                                    </div>
                                </NavLink>
                            </li> */}
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
=======
import PerfectScrollbar from "react-perfect-scrollbar";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toggleSidebar } from "../../store/themeConfigSlice";
import { IRootState } from "../../store";
import { useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LaunchIcon from "@mui/icons-material/Launch";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import PersonIcon from "@mui/icons-material/Person";
import logo from "../../../public/assets/logo/AOL LOGO BANGALORE ASHRAM BLACK.png";
import { useLanguage } from "../../context/LanguageContext";
import DirectionsIcon from "@mui/icons-material/Directions";
import { logout } from "../../allapi/api";
import axios from "axios";

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    Profile: "Profile",
    "Internal Logins": "Internal Logins",
    "Live Video": "Live Video",
    "Log Out": "Log Out",
  },
  hi: {
    Profile: "प्रोफ़ाइल",
    "Internal Logins": "आंतरिक लॉगिन",
    "Live Video": "लाइव वीडियो",
    "Log Out": "लॉग आउट",
  },
  kn: {
    Profile: "ಪ್ರೊಫೈಲ್",
    "Internal Logins": "ಆಂತರಿಕ ಲಾಗಿನ್",
    "Live Video": "ಲೈವ್ ವಿಡಿಯೋ",
    "Log Out": "ಲಾಗ್ ಔಟ್",
  },
  ta: {
    Profile: "பிரொபைல்",
    "Internal Logins": "உள்நாட்டு லாகின்கள்",
    "Live Video": "செயல்பாட்டு வீடியோ",
    "Log Out": "வெளியேறு",
  },
  te: {
    Profile: "ప్రొఫైల్",
    "Internal Logins": "ఆంతరిక లాగిన్లు",
    "Live Video": "లైవ్ వీడియో",
    "Log Out": "లాగ్ అవుట్",
  },
  gu: {
    Profile: "પ્રોફાઈલ",
    "Internal Logins": "આંતરિક લૉગિન",
    "Live Video": "લાઇવ વિડિયો",
    "Log Out": "લોગ આઉટ",
  },
  mr: {
    Profile: "प्रोफाइल",
    "Internal Logins": "आंतरिक लॉगिन",
    "Live Video": "लाइव्ह व्हिडिओ",
    "Log Out": "लॉग आऊट",
  },
  ml: {
    Profile: "പ്രൊഫൈൽ",
    "Internal Logins": "അന്തർഗത ലോഗിൻ",
    "Live Video": "ലൈവ് വീഡിയോ",
    "Log Out": "ലോഗ് ഔട്ട്",
  },
  pa: {
    Profile: "ਪਰੋਫਾਈਲ",
    "Internal Logins": "ਆਂਤਰਿਕ ਲੌਗਇਨ",
    "Live Video": "ਲਾਈਵ ਵੀਡੀਓ",
    "Log Out": "ਲੌਗ ਆਉਟ",
  },
  bn: {
    Profile: "প্রোফাইল",
    "Internal Logins": "অভ্যন্তরীণ লগইন",
    "Live Video": "লাইভ ভিডিও",
    "Log Out": "লগ আউট",
  },
  ru: {
    Profile: "Профиль",
    "Internal Logins": "Внутренние Логины",
    "Live Video": "Прямой Эфир",
    "Log Out": "Выйти",
  },
  es: {
    Profile: "Perfil",
    "Internal Logins": "Inicios de sesión internos",
    "Live Video": "Video en vivo",
    "Log Out": "Cerrar sesión",
  },
  zh: {
    Profile: "个人资料",
    "Internal Logins": "内部登录",
    "Live Video": "现场直播",
    "Log Out": "登出",
  },
  mn: {
    Profile: "Профайл",
    "Internal Logins": "Дотоод Нэвтрэлт",
    "Live Video": "Тамирын Видео",
    "Log Out": "Гарах",
  },
  pl: {
    Profile: "Profil",
    "Internal Logins": "Logowanie wewnętrzne",
    "Live Video": "Wideo na żywo",
    "Log Out": "Wyloguj",
  },
  bg: {
    Profile: "Профил",
    "Internal Logins": "Вътрешни влизания",
    "Live Video": "На живо видео",
    "Log Out": "Изход",
  },
  fr: {
    Profile: "Profil",
    "Internal Logins": "Connexions internes",
    "Live Video": "Vidéo en direct",
    "Log Out": "Se déconnecter",
  },
  de: {
    Profile: "Profil",
    "Internal Logins": "Interne Anmeldungen",
    "Live Video": "Live-Video",
    "Log Out": "Abmelden",
  },
  nl: {
    Profile: "Profiel",
    "Internal Logins": "Interne Inloggen",
    "Live Video": "Live Video",
    "Log Out": "Uitloggen",
  },
  it: {
    Profile: "Profilo",
    "Internal Logins": "Accessi interni",
    "Live Video": "Video in diretta",
    "Log Out": "Esci",
  },
  pt: {
    Profile: "Perfil",
    "Internal Logins": "Logins internos",
    "Live Video": "Vídeo ao vivo",
    "Log Out": "Sair",
  },
  ja: {
    Profile: "プロフィール",
    "Internal Logins": "内部ログイン",
    "Live Video": "ライブビデオ",
    "Log Out": "ログアウト",
  },
  vi: {
    Profile: "Hồ sơ",
    "Internal Logins": "Đăng nhập nội bộ",
    "Live Video": "Video trực tiếp",
    "Log Out": "Đăng xuất",
  },
};

const Sidebar = () => {
  const navigate = useNavigate();
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const semidark = themeConfig.semidark;
  const location = useLocation();
  const dispatch = useDispatch();
  const { language } = useLanguage();

  useEffect(() => {
    const selector = document.querySelector(
      `.sidebar ul a[href="${window.location.pathname}"]`
    );
    if (selector) {
      selector.classList.add("active");
      const ul = selector.closest("ul.sub-menu") as HTMLElement | null;
      if (ul) {
        const ele = ul.closest("li.menu")?.querySelectorAll(".nav-link");
        if (ele?.length) {
          setTimeout(() => {
            (ele[0] as HTMLElement).click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [location]);

  function handleLogout() {
    const userId = localStorage.getItem("userId"); // Make sure you're saving the device token in localStorage after login or FCM registration
    localStorage.clear();

    // localStorage.removeItem("userId");
    // localStorage.removeItem("email");
    // localStorage.removeItem("username");
    // localStorage.removeItem("userLoggedIn");
    // localStorage.removeItem("phone");
    // localStorage.removeItem("aadhar");
    // localStorage.removeItem("aolfcmToken"); // remove token from localStorage
    //  clearToken();
    // console.log("Logged out successfully");
    // console.log(token, "token");

    // Call logout API
    // =====

    axios
      .patch(logout, { userId })
      .then((response) => {
        console.log(response, "response");
      })
      .catch((error) => {
        console.log("Logout API error:", error.response?.data || error.message);
      });
    // =====

    navigate("/login");
  }

  const t = (key: string): string => {
    return translations[language]?.[key] || translations["en"][key] || key;
  };

  return (
    <div className={semidark ? "dark" : ""} style={{ zIndex: "99" }}>
      <nav
        className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${
          semidark ? "text-white-dark" : ""
        }`}
      >
        <div className="dark:bg-black h-full">
          <div className="flex justify-between items-center px-4 py-3 bg-[#A7E6F8]">
            <NavLink
              to="/"
              className="main-logo flex items-center shrink-0 justify-center"
            >
              <img
                className="w-32 m-auto ml-10 flex-none"
                src={logo}
                alt="logo"
              />
            </NavLink>

            <button
              type="button"
              className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
              onClick={() => dispatch(toggleSidebar())}
            >
              <KeyboardArrowDownIcon className="m-auto rotate-90" />
            </button>
          </div>

          <PerfectScrollbar className="h-[calc(100vh-80px)] relative bg-[#dbf3fa] pt-4">
            <ul className="relative font-semibold space-y-0.5 p-4 py-0">
              <li className="nav-item font-poppins">
                <ul>
                  <li className="nav-item">
                    <NavLink
                      to="/profile"
                      className="group"
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <PersonIcon />
                        <span>{t("Profile")}</span>
                      </div>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/internal"
                      className="group"
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <LaunchIcon />
                        <span>{t("Internal Logins")}</span>
                      </div>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/live_link"
                      className="group"
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <LiveTvIcon />
                        <span>{t("Live Video")}</span>
                      </div>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/choose_direction"
                      className="group"
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <DirectionsIcon />
                        <span>{t("Directions")}</span>
                      </div>
                    </NavLink>
                  </li>
                </ul>
              </li>
              {/* <div className="flex justify-center py-2 h-[50vh]">
                <button
                  className="bg-[#A7E6F8] hover:bg-[#88def5] px-6 rounded-lg py-3 font-bold font-poppins absolute bottom-0"
                  onClick={handleLogout}
                >
                  {t("Log Out")}
                </button>
              </div> */}
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
>>>>>>> 6a0b4c9e69ef0c92143a74e5066c1bbee222661c
};

export default Sidebar;
