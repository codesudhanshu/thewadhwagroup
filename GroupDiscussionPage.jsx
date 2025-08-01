'use client';
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const GroupDiscussionPage = ({ data }) => {
  // Extract today's and upcoming group discussions from the API data
  const { todayList = [], upcomingList = [] } = data?.result || {};

  // Combine both lists with their categories
  const allDiscussions = [
    ...todayList.map(item => ({ ...item, Category: "Today" })),
    ...upcomingList.map(item => ({ ...item, Category: "Upcoming" }))
  ];

  return (
    <div className="min-vh-100" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div className="position-absolute w-100 h-100" style={{zIndex: 0}}>
        <div className="position-absolute rounded-circle opacity-10" style={{
          width: '300px',
          height: '300px',
          background: 'linear-gradient(45deg, #A65FFD, #049AA4)',
          top: '-150px',
          right: '-150px',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div className="position-absolute rounded-circle opacity-10" style={{
          width: '200px',
          height: '200px',
          background: 'linear-gradient(45deg, #03adb8, #A65FFD)',
          bottom: '-100px',
          left: '-100px',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>
      </div>

      <div className="container-fluid py-5 position-relative" style={{zIndex: 1}}>
        <div className="row">
          <div className="col-12">
            {/* Modern Header */}
            <div className="text-center mb-5">
              <div className="d-inline-block p-3 rounded-circle mb-3" style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <i className="bi bi-chat-dots" style={{fontSize: '2.5rem', color: '#fff'}}></i>
              </div>
              <h1 className="display-4 fw-bold text-white mb-3" style={{
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                letterSpacing: '-0.02em'
              }}>
                Group Discussions
              </h1>
              <p className="lead text-white-50 mb-0">
                Join expert-led discussions and expand your knowledge
              </p>
            </div>
            
            {/* Today's Discussions */}
            {todayList.length > 0 && (
              <div className="mb-5">
                <div className="d-flex align-items-center justify-content-center mb-4">
                  <div className="text-center">
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      <div className="p-2 rounded-circle me-3" style={{
                        background: 'rgba(4, 154, 164, 0.2)',
                        backdropFilter: 'blur(10px)'
                      }}>
                        <i className="bi bi-calendar-day text-white" style={{fontSize: '1.5rem'}}></i>
                      </div>
                      <h2 className="fw-bold mb-0 text-white">Today's Discussions</h2>
                      <span className="badge ms-3 px-3 py-2" style={{
                        backgroundColor: '#049AA4',
                        boxShadow: '0 4px 15px rgba(4, 154, 164, 0.4)',
                        fontSize: '0.9rem'
                      }}>
                        {todayList.length} Available
                      </span>
                    </div>
                    <div className="w-100 mx-auto" style={{
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #049AA4, transparent)',
                      maxWidth: '200px'
                    }}></div>
                  </div>
                </div>
                
                <div className="position-relative">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={{
                      nextEl: '.swiper-button-next-today',
                      prevEl: '.swiper-button-prev-today',
                    }}
                    pagination={{
                      clickable: true,
                      el: '.swiper-pagination-today',
                    }}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    spaceBetween={30}
                    slidesPerView={3}
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                      },
                      768: {
                        slidesPerView: 2,
                        spaceBetween: 25
                      },
                      1024: {
                        slidesPerView: 3,
                        spaceBetween: 30
                      }
                    }}
                    className="pb-5"
                  >
                    {todayList.map((discussion, index) => (
                      <SwiperSlide key={`today-${index}`}>
                        <DiscussionCard discussion={discussion} isToday={true} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  
                  {/* Modern Navigation buttons */}
                  <div className="swiper-button-prev-today position-absolute top-50 translate-middle-y text-white rounded-circle d-flex align-items-center justify-content-center" style={{
                    width: '50px', 
                    height: '50px', 
                    zIndex: 10, 
                    background: 'linear-gradient(135deg, #A65FFD, #764ba2)',
                    boxShadow: '0 8px 25px rgba(166, 95, 253, 0.4)',
                    left: '-25px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    <i className="bi bi-chevron-left" style={{fontSize: '1.2rem'}}></i>
                  </div>
                  <div className="swiper-button-next-today position-absolute top-50 translate-middle-y text-white rounded-circle d-flex align-items-center justify-content-center" style={{
                    width: '50px', 
                    height: '50px', 
                    zIndex: 10, 
                    background: 'linear-gradient(135deg, #A65FFD, #764ba2)',
                    boxShadow: '0 8px 25px rgba(166, 95, 253, 0.4)',
                    right: '-25px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    <i className="bi bi-chevron-right" style={{fontSize: '1.2rem'}}></i>
                  </div>
                  
                  {/* Modern Pagination */}
                  <div className="swiper-pagination-today text-center mt-4"></div>
                </div>
              </div>
            )}

            {/* Upcoming Discussions */}
            {upcomingList.length > 0 && (
              <div className="mb-5">
                <div className="d-flex align-items-center justify-content-center mb-4">
                  <div className="text-center">
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      <div className="p-2 rounded-circle me-3" style={{
                        background: 'rgba(3, 173, 184, 0.2)',
                        backdropFilter: 'blur(10px)'
                      }}>
                        <i className="bi bi-calendar-event text-white" style={{fontSize: '1.5rem'}}></i>
                      </div>
                      <h2 className="fw-bold mb-0 text-white">Upcoming Discussions</h2>
                      <span className="badge ms-3 px-3 py-2" style={{
                        backgroundColor: '#03adb8',
                        boxShadow: '0 4px 15px rgba(3, 173, 184, 0.4)',
                        fontSize: '0.9rem'
                      }}>
                        {upcomingList.length} Scheduled
                      </span>
                    </div>
                    <div className="w-100 mx-auto" style={{
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #03adb8, transparent)',
                      maxWidth: '200px'
                    }}></div>
                  </div>
                </div>
                
                <div className="position-relative">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={{
                      nextEl: '.swiper-button-next-upcoming',
                      prevEl: '.swiper-button-prev-upcoming',
                    }}
                    pagination={{
                      clickable: true,
                      el: '.swiper-pagination-upcoming',
                    }}
                    autoplay={{
                      delay: 6000,
                      disableOnInteraction: false,
                    }}
                    spaceBetween={30}
                    slidesPerView={3}
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                      },
                      768: {
                        slidesPerView: 2,
                        spaceBetween: 25
                      },
                      1024: {
                        slidesPerView: 3,
                        spaceBetween: 30
                      }
                    }}
                    className="pb-5"
                  >
                    {upcomingList.map((discussion, index) => (
                      <SwiperSlide key={`upcoming-${index}`}>
                        <DiscussionCard discussion={discussion} isToday={false} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  
                  {/* Modern Navigation buttons */}
                  <div className="swiper-button-prev-upcoming position-absolute top-50 translate-middle-y text-white rounded-circle d-flex align-items-center justify-content-center" style={{
                    width: '50px', 
                    height: '50px', 
                    zIndex: 10, 
                    background: 'linear-gradient(135deg, #03adb8, #049AA4)',
                    boxShadow: '0 8px 25px rgba(3, 173, 184, 0.4)',
                    left: '-25px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    <i className="bi bi-chevron-left" style={{fontSize: '1.2rem'}}></i>
                  </div>
                  <div className="swiper-button-next-upcoming position-absolute top-50 translate-middle-y text-white rounded-circle d-flex align-items-center justify-content-center" style={{
                    width: '50px', 
                    height: '50px', 
                    zIndex: 10, 
                    background: 'linear-gradient(135deg, #03adb8, #049AA4)',
                    boxShadow: '0 8px 25px rgba(3, 173, 184, 0.4)',
                    right: '-25px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    <i className="bi bi-chevron-right" style={{fontSize: '1.2rem'}}></i>
                  </div>
                  
                  {/* Modern Pagination */}
                  <div className="swiper-pagination-upcoming text-center mt-4"></div>
                </div>
              </div>
            )}

            {/* Modern Empty State */}
            {allDiscussions.length === 0 && (
              <div className="text-center py-5">
                <div className="mb-4">
                  <div className="d-inline-block p-4 rounded-circle" style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    <i className="bi bi-chat-square-text text-white" style={{fontSize: '4rem'}}></i>
                  </div>
                </div>
                <h3 className="text-white mb-3 fw-bold">No Group Discussions Available</h3>
                <p className="text-white-50 mb-4 lead">
                  Check back later for upcoming group discussions with our experts.
                </p>
                <button className="btn btn-lg px-5 py-3 text-white fw-semibold" style={{
                  background: 'linear-gradient(135deg, #A65FFD, #764ba2)',
                  boxShadow: '0 8px 25px rgba(166, 95, 253, 0.4)',
                  borderRadius: '50px',
                  border: 'none',
                  transition: 'all 0.3s ease'
                }}>
                  <i className="bi bi-bell me-2"></i>
                  Notify Me When Available
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .hover-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .hover-card:hover {
          transform: translateY(-10px) scale(1.02);
        }
        
        .swiper-pagination-bullet {
          background: rgba(255,255,255,0.5) !important;
          opacity: 1 !important;
          width: 12px !important;
          height: 12px !important;
        }
        
        .swiper-pagination-bullet-active {
          background: #A65FFD !important;
          box-shadow: 0 0 10px rgba(166, 95, 253, 0.6) !important;
        }
        
        .swiper-button-prev-today:hover,
        .swiper-button-next-today:hover,
        .swiper-button-prev-upcoming:hover,
        .swiper-button-next-upcoming:hover {
          transform: scale(1.1) !important;
          box-shadow: 0 12px 35px rgba(166, 95, 253, 0.6) !important;
        }
      `}</style>
    </div>
  );
};

// Enhanced Discussion Card Component
const DiscussionCard = ({ discussion, isToday }) => {
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const primaryColor = isToday ? '#049AA4' : '#03adb8';
  const accentColor = '#A65FFD';

  // Handle negative available seats
  const availableSeats = Math.max(0, discussion.AVAILABLE_SEATS);
  const isFullyBooked = discussion.AVAILABLE_SEATS <= 0;

  return (
    <div 
      className="card h-100 border-0 hover-card position-relative overflow-hidden" 
      style={{
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255,255,255,0.2)'
      }}
    >
      {/* Gradient Overlay */}
      <div className="position-absolute w-100" style={{
        height: '4px',
        top: 0,
        background: `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
        zIndex: 1
      }}></div>

      {/* Card Header with Glass Effect */}
      <div className="card-header border-0 text-center py-4 position-relative" style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px 20px 0 0'
      }}>
        <div className="position-relative d-inline-block mb-3">
          <div className="position-relative">
            <Image
              src={discussion.DOCTOR_IMAGE || "/assets/images/dummy_icon.png"}
              alt={discussion.DOCTOR_FULL_NAME}
              width={90}
              height={90}
              className="rounded-circle shadow-lg"
              style={{
                border: `3px solid ${primaryColor}`,
                padding: '2px'
              }}
            />
            {/* Online Status Indicator */}
            <div className="position-absolute bottom-0 end-0 rounded-circle border border-2 border-white" style={{
              width: '20px',
              height: '20px',
              backgroundColor: '#28a745',
              boxShadow: '0 2px 8px rgba(40, 167, 69, 0.4)'
            }}></div>
          </div>
          <span 
            className="badge position-absolute rounded-pill text-white fw-semibold px-3 py-2"
            style={{
              backgroundColor: primaryColor,
              top: '-5px',
              right: '-10px',
              boxShadow: `0 4px 12px rgba(${isToday ? '4, 154, 164' : '3, 173, 184'}, 0.4)`,
              fontSize: '0.75rem'
            }}
          >
            {isToday ? '🔥 Today' : '📅 Soon'}
          </span>
        </div>
        <h5 className="card-title mb-1 fw-bold" style={{color: '#2c3e50'}}>{discussion.DOCTOR_FULL_NAME || "Expert Advisor"}</h5>
        <div className="d-flex align-items-center justify-content-center">
          <i className="bi bi-patch-check-fill me-1" style={{color: primaryColor}}></i>
          <small className="text-muted fw-medium">Verified Expert</small>
        </div>
      </div>
      
      {/* Card Body with Enhanced Content */}
      <div className="card-body d-flex flex-column px-4">
        <h4 className="card-title fw-bold mb-3 lh-base" style={{
          color: primaryColor,
          fontSize: '1.25rem'
        }}>
          {discussion.TITLE}
        </h4>
        <p className="card-text text-muted mb-4 flex-grow-1 lh-base" style={{fontSize: '0.95rem'}}>
          {discussion.DESCRIPTION}
        </p>
        
        {/* Enhanced Meta Info with Icons */}
        <div className="mb-4">
          <div className="row g-3">
            <div className="col-12">
              <div className="d-flex align-items-center p-2 rounded-3" style={{backgroundColor: 'rgba(4, 154, 164, 0.05)'}}>
                <div className="p-2 rounded-circle me-3" style={{backgroundColor: primaryColor}}>
                  <i className="bi bi-calendar3 text-white" style={{fontSize: '0.9rem'}}></i>
                </div>
                <div>
                  <div className="fw-bold text-dark" style={{fontSize: '0.95rem'}}>{discussion.FORMATED_DATE}</div>
                  <small className="text-muted">Discussion Date</small>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center p-2 rounded-3" style={{backgroundColor: 'rgba(255, 193, 7, 0.05)'}}>
                <div className="p-2 rounded-circle me-2" style={{backgroundColor: '#ffc107'}}>
                  <i className="bi bi-clock text-white" style={{fontSize: '0.8rem'}}></i>
                </div>
                <div>
                  <div className="fw-semibold text-dark" style={{fontSize: '0.85rem'}}>{discussion.FORMATED_TIME}</div>
                  <small className="text-muted">Start Time</small>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center p-2 rounded-3" style={{backgroundColor: 'rgba(166, 95, 253, 0.05)'}}>
                <div className="p-2 rounded-circle me-2" style={{backgroundColor: accentColor}}>
                  <i className="bi bi-stopwatch text-white" style={{fontSize: '0.8rem'}}></i>
                </div>
                <div>
                  <div className="fw-semibold text-dark" style={{fontSize: '0.85rem'}}>{discussion.CALL_DURATION}m</div>
                  <small className="text-muted">Duration</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Card Footer */}
      <div className="card-footer bg-transparent border-0 pt-0 px-4 pb-4">
        {/* Seats Information with Progress */}
        <div className="row align-items-center mb-4">
          <div className="col-6">
            <div className="d-flex align-items-center">
              <div className="p-2 rounded-circle me-3" style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                color: 'white'
              }}>
                <i className="bi bi-people-fill" style={{fontSize: '1rem'}}></i>
              </div>
              <div>
                <div className="h5 mb-0 fw-bold" style={{color: availableSeats > 0 ? '#28a745' : '#dc3545'}}>
                  {availableSeats}
                </div>
                <small className="text-muted fw-medium">seats left</small>
              </div>
            </div>
          </div>
          <div className="col-6 text-end">
            <div className="text-muted small mb-1">
              <strong>{discussion.MAX_SEATS}</strong> total seats
            </div>
            <div className="progress" style={{height: '6px', borderRadius: '10px'}}>
              <div 
                className="progress-bar"
                style={{
                  width: `${Math.min(100, Math.max(0, (discussion.MAX_SEATS - availableSeats) / discussion.MAX_SEATS * 100))}%`,
                  background: `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
                  borderRadius: '10px',
                  transition: 'width 0.6s ease'
                }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Price and Enhanced Action Button */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-center">
            <div className="h3 mb-0 fw-bold" style={{
              background: 'linear-gradient(135deg, #28a745, #20c997)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              ${discussion.AMOUNT}
            </div>
            <small className="text-muted fw-medium">per person</small>
          </div>
          
          {/* Enhanced Registration Button */}
          {discussion.IS_REGISTERED === 1 ? (
            <button 
              className="btn px-4 py-2 text-white fw-semibold position-relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #28a745, #20c997)',
                boxShadow: '0 8px 20px rgba(40, 167, 69, 0.3)',
                borderRadius: '25px',
                border: 'none',
                minWidth: '160px'
              }}
              disabled
            >
              <i className="bi bi-check-circle me-2"></i>
              Registered ✓
            </button>
          ) : (
            <button 
              className="btn px-4 py-2 text-white fw-semibold position-relative overflow-hidden"
              style={{
                background: isFullyBooked 
                  ? 'linear-gradient(135deg, #6c757d, #5a6268)' 
                  : `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                boxShadow: isFullyBooked 
                  ? 'none' 
                  : `0 8px 20px rgba(${isToday ? '4, 154, 164' : '3, 173, 184'}, 0.4)`,
                borderRadius: '25px',
                border: 'none',
                minWidth: '160px',
                transition: 'all 0.3s ease'
              }}
              disabled={isFullyBooked}
            >
              {isFullyBooked ? (
                <>
                  <i className="bi bi-x-circle me-2"></i>
                  Fully Booked
                </>
              ) : (
                <>
                  <i className="bi bi-calendar-plus me-2"></i>
                  Book Now
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupDiscussionPage;